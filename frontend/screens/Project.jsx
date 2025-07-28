import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../config/axios'
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
import Markdown from 'markdown-to-jsx'
import CodeEditor from '../src/components/CodeEditor';
import { getWebContainer } from '../config/webcontainer'


function SyntaxHighlightedCode(props) {
    const ref = useRef(null)

    React.useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [ props.className, props.children ])

    return <code {...props} ref={ref} />
}


const Project = () => {

    const location = useLocation()

    const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(false)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isGithubModalOpen, setIsGithubModalOpen ] = useState(false)
    const [ githubToken, setGithubToken ] = useState('')
    const [ repoOwner, setRepoOwner ] = useState('')
    const [ repoName, setRepoName ] = useState('')
    const [ selectedUserId, setSelectedUserId ] = useState(new Set()) // Initialized as Set
    const [ project, setProject ] = useState(location.state.project)
    const [ message, setMessage ] = useState('')
    const { user } = useContext(UserContext)
    const messageBox = React.createRef()

    const [ users, setUsers ] = useState([])
    const [ messages, setMessages ] = useState([]) // New state variable for messages
    const [ fileTree, setFileTree ] = useState({})

    const [ currentFile, setCurrentFile ] = useState(null)
    const [ openFiles, setOpenFiles ] = useState([])

    const [ webContainer, setWebContainer ] = useState(null)
    const [ iframeUrl, setIframeUrl ] = useState(null)

    const [ runProcess, setRunProcess ] = useState(null)
    const [ commitMessage, setCommitMessage ] = useState('')
    const [ newBranchName, setNewBranchName ] = useState('')
    const [ isGitModalOpen, setIsGitModalOpen ] = useState(false)
    const [ gitModalType, setGitModalType ] = useState('')

    const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }

            return newSelectedUserId;
        });


    }


    function addCollaborators() {

        axios.put("/projects/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            console.log(res.data)
            setIsModalOpen(false)

        }).catch(err => {
            console.log(err)
        })

    }

    const send = () => {

        sendMessage('project-message', {
            message,
            sender: user
        })
        setMessages(prevMessages => [ ...prevMessages, { sender: user, message } ]) // Update messages state
        setMessage("")

    }

    function WriteAiMessage(message) {

        const messageObject = JSON.parse(message)

        return (
            <div
                className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
            >
                <Markdown
                    children={messageObject.text}
                    options={{
                        overrides: {
                            code: SyntaxHighlightedCode,
                        },
                    }}
                />
            </div>)
    }

    useEffect(() => {

        const socket = initializeSocket(project._id)

        socket.emit('join-project', project._id);

        receiveMessage('code-change', (data) => {
            setFileTree(data.fileTree);
        });


        if (!webContainer) {
            getWebContainer().then(container => {
                setWebContainer(container)
                console.log("container started")
            })
        }


        receiveMessage('project-message', data => {

            console.log(data)

            if (data.sender._id == 'ai') {


                const message = JSON.parse(data.message)

                console.log(message)

                webContainer?.mount(message.fileTree)

                if (message.fileTree) {
                    setFileTree(message.fileTree || {})
                }
                setMessages(prevMessages => [ ...prevMessages, data ]) // Update messages state
            } else {


                setMessages(prevMessages => [ ...prevMessages, data ]) // Update messages state
            }
        })


        axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {

            console.log(res.data.project)

            setProject(res.data.project)
            setFileTree(res.data.project.fileTree || {})
        })

        axios.get('/users/all').then(res => {

            setUsers(res.data.users)

        }).catch(err => {

            console.log(err)

        })

    }, [])

    function saveFileTree(ft) {
        axios.put('/projects/update-file-tree', {
            projectId: project._id,
            fileTree: ft
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }


    // Removed appendIncomingMessage and appendOutgoingMessage functions

    function scrollToBottom() {
        messageBox.current.scrollTop = messageBox.current.scrollHeight
    }

    return (
        <main className='h-screen w-screen flex'>
            <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
                <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-10 top-0'>
                    <button className='flex gap-2' onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-fill mr-1"></i>
                        <p>Add collaborator</p>
                    </button>
                    <button className='flex gap-2' onClick={() => setIsGithubModalOpen(true)}>
                        <i className="ri-github-fill mr-1"></i>
                        <p>Link GitHub</p>
                    </button>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">

                    <div
                        ref={messageBox}
                        className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-52'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                                <small className='opacity-65 text-xs'>{msg.sender.email}</small>
                                <div className='text-sm'>
                                    {msg.sender._id === 'ai' ?
                                        WriteAiMessage(msg.message)
                                        : <p>{msg.message}</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="inputField w-full flex absolute bottom-0">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='p-2 px-4 border-none outline-none flex-grow' type="text" placeholder='Enter message' />
                        <button
                            onClick={send}
                            className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill"></i></button>
                    </div>
                </div>
                <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                    <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>

                        <h1
                            className='font-semibold text-lg'
                        >Collaborators</h1>

                        <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </header>
                    <div className="users flex flex-col gap-2">

                        {project.users && project.users.map(projectUser => {


                            return (
                                <div className="user cursor-pointer hover:bg-slate-200 p-2 flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                            <i className="ri-user-fill absolute"></i>
                                        </div>
                                        <h1 className='font-semibold text-lg'>{projectUser.user.email}</h1>
                                    </div>
                                    <div className="role-selector">
                                        <select
                                            disabled={project.users.find(u => u.user._id === user._id)?.role !== 'owner'}
                                            value={projectUser.role}
                                            onChange={(e) => {
                                                axios.put('/projects/update-user-role', {
                                                    projectId: project._id,
                                                    userId: projectUser.user._id,
                                                    role: e.target.value
                                                }).then(res => {
                                                    setProject(res.data.project)
                                                })
                                            }}
                                            className="p-2 rounded-md bg-slate-300"
                                        >
                                            <option value="viewer">Viewer</option>
                                            <option value="editor">Editor</option>
                                            <option value="owner">Owner</option>
                                        </select>
                                    </div>
                                </div>
                            )


                        })}
                    </div>
                </div>
            </section>

            <section className="right  bg-red-50 flex-grow h-full flex">

                <div className="explorer h-full max-w-64 min-w-52 bg-slate-200">
                    <div className="file-tree w-full">
                        {
                            Object.keys(fileTree).map((file, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentFile(file)
                                        setOpenFiles([ ...new Set([ ...openFiles, file ]) ])
                                    }}
                                    className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-300 w-full">
                                    <p
                                        className='font-semibold text-lg'
                                    >{file}</p>
                                </button>))

                        }
                    </div>

                </div>


                <div className="code-editor flex flex-col flex-grow h-full shrink">

                    <div className="top flex justify-between w-full">

                        <div className="files flex">
                            {
                                openFiles.map((file, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentFile(file)}
                                        className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-slate-300 ${currentFile === file ? 'bg-slate-400' : ''}`}>
                                        <p
                                            className='font-semibold text-lg'
                                        >{file}</p>
                                    </button>
                                ))
                            }
                        </div>

                        <div className="actions flex gap-2">
                            <button
                                onClick={() => {
                                    setGitModalType('commit');
                                    setIsGitModalOpen(true);
                                }}
                                className='p-2 px-4 bg-slate-300 text-white'
                            >
                                Commit
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await axios.post('/github/pull', { projectId: project._id });
                                        console.log('Pull successful:', res.data);
                                        alert('Pull successful!');
                                    } catch (error) {
                                        console.error('Error pulling changes:', error);
                                        alert('Failed to pull changes.');
                                    }
                                }}
                                className='p-2 px-4 bg-slate-300 text-white'
                            >
                                Pull
                            </button>
                            <button
                                onClick={() => {
                                    setGitModalType('branch');
                                    setIsGitModalOpen(true);
                                }}
                                className='p-2 px-4 bg-slate-300 text-white'
                            >
                                Branch
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await axios.post('/ai/debug-code', {
                                            code: fileTree[currentFile].file.contents,
                                            errorDetails: '' // You can add error details here if available
                                        });
                                        alert('Debug result: ' + res.data);
                                    } catch (error) {
                                        console.error('Error debugging code:', error);
                                        alert('Failed to debug code.');
                                    }
                                }}
                                className='p-2 px-4 bg-slate-300 text-white'
                            >
                                Debug Code
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await axios.post('/ai/review-code', {
                                            code: fileTree[currentFile].file.contents,
                                            context: '' // You can add context here
                                        });
                                        alert('Code review result: ' + res.data);
                                    } catch (error) {
                                        console.error('Error reviewing code:', error);
                                        alert('Failed to review code.');
                                    }
                                }}
                                className='p-2 px-4 bg-slate-300 text-white'
                            >
                                Code Review
                            </button>
                            <button
                                onClick={async () => {
                                    await webContainer.mount(fileTree)


                                    const installProcess = await webContainer.spawn("npm", [ "install" ])



                                    installProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk)
                                        }
                                    }))

                                    if (runProcess) {
                                        runProcess.kill()
                                    }

                                    let tempRunProcess = await webContainer.spawn("npm", [ "start" ]);

                                    tempRunProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk)
                                        }
                                    }))

                                    setRunProcess(tempRunProcess)

                                    webContainer.on('server-ready', (port, url) => {
                                        console.log(port, url)
                                        setIframeUrl(url)
                                    })

                                }}
                                className='p-2 px-4 bg-slate-300 text-white'
                            >
                                run
                            </button>


                        </div>
                    </div>
                    <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
                        {
                            fileTree[ currentFile ] && (
                                <CodeEditor projectId={project._id} fileId={currentFile} />
                            )
                        }
                    </div>

                </div>

                {iframeUrl && webContainer &&
                    (<div className="flex min-w-96 flex-col h-full">
                        <div className="address-bar">
                            <input type="text"
                                onChange={(e) => setIframeUrl(e.target.value)}
                                value={iframeUrl} className="w-full p-2 px-4 bg-slate-200" />
                        </div>
                        <iframe src={iframeUrl} className="w-full h-full"></iframe>
                    </div>)
                }


            </section>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}

            {isGithubModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Link GitHub Repository</h2>
                            <button onClick={() => setIsGithubModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="github-form flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="GitHub Personal Access Token"
                                value={githubToken}
                                onChange={(e) => setGithubToken(e.target.value)}
                                className="p-2 border rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Repository Owner (e.g., your-username)"
                                value={repoOwner}
                                onChange={(e) => setRepoOwner(e.target.value)}
                                className="p-2 border rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Repository Name (e.g., my-project)"
                                value={repoName}
                                onChange={(e) => setRepoName(e.target.value)}
                                className="p-2 border rounded-md"
                            />
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await axios.post('/github/create-repo', {
                                            projectName: project.name,
                                            githubToken,
                                            repoOwner,
                                            repoName,
                                        });
                                        console.log(res.data);
                                        setProject(res.data);
                                        setIsGithubModalOpen(false);
                                    } catch (error) {
                                        console.error('Error linking GitHub repo:', error);
                                        alert('Failed to link GitHub repository.');
                                    }
                                }}
                                className='px-4 py-2 bg-blue-600 text-white rounded-md'>
                                Link Repository
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isGitModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>
                                {gitModalType === 'commit' && 'Commit Changes'}
                                {gitModalType === 'branch' && 'Create Branch'}
                            </h2>
                            <button onClick={() => setIsGitModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="git-form flex flex-col gap-4">
                            {gitModalType === 'commit' && (
                                <>
                                    <textarea
                                        placeholder="Commit message"
                                        value={commitMessage}
                                        onChange={(e) => setCommitMessage(e.target.value)}
                                        className="p-2 border rounded-md"
                                    />
                                    <button
                                        onClick={async () => {
                                            try {
                                                // Assuming you want to commit the current file
                                                const res = await axios.post('/github/commit', {
                                                    projectId: project._id,
                                                    filePath: currentFile,
                                                    content: fileTree[currentFile].file.contents,
                                                    message: commitMessage,
                                                });
                                                console.log('Commit successful:', res.data);
                                                alert('Commit successful!');
                                                setIsGitModalOpen(false);
                                            } catch (error) {
                                                console.error('Error committing changes:', error);
                                                alert('Failed to commit changes.');
                                            }
                                        }}
                                        className='px-4 py-2 bg-blue-600 text-white rounded-md'>
                                        Commit
                                    </button>
                                </>
                            )}
                            {gitModalType === 'branch' && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="New branch name"
                                        value={newBranchName}
                                        onChange={(e) => setNewBranchName(e.target.value)}
                                        className="p-2 border rounded-md"
                                    />
                                    <button
                                        onClick={async () => {
                                            try {
                                                // You'll need to fetch the SHA of the base branch dynamically
                                                // For simplicity, let's assume master/main for now
                                                const res = await axios.post('/github/create-branch', {
                                                    projectId: project._id,
                                                    newBranchName,
                                                    baseBranchSha: 'main' // Placeholder, needs to be dynamic
                                                });
                                                console.log('Branch created:', res.data);
                                                alert('Branch created successfully!');
                                                setIsGitModalOpen(false);
                                            } catch (error) {
                                                console.error('Error creating branch:', error);
                                                alert('Failed to create branch.');
                                            }
                                        }}
                                        className='px-4 py-2 bg-blue-600 text-white rounded-md'>
                                        Create Branch
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Project