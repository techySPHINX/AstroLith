import React, { useRef, useEffect } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import axios from '../../config/axios';

const CodeEditor = ({ projectId, fileId }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(
            'ws://localhost:3001', // This should be your server URL
            `${projectId}-${fileId}`,
            ydoc
        );
        const ytext = ydoc.getText('monaco');

        const editor = monaco.editor.create(editorRef.current, {
            value: ytext.toString(),
            language: 'javascript',
            theme: 'vs-dark',
        });

        const monacoBinding = new MonacoBinding(
            ytext,
            editor.getModel(),
            new Set([editor]),
            provider.awareness
        );

        // Register a completion provider
        const completionProvider = monaco.languages.registerCompletionItemProvider('javascript', {
            async provideCompletionItems(model, position) {
                const textUntilPosition = model.getValueInRange({
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                });

                try {
                    const res = await axios.post('/ai/code-completion', {
                        codeSnippet: textUntilPosition,
                        language: 'javascript',
                    });
                    const suggestions = [{
                        label: res.data,
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: res.data,
                        range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                    }];
                    return { suggestions: suggestions };
                } catch (error) {
                    console.error('Error fetching code completion:', error);
                    return { suggestions: [] };
                }
            },
        });

        return () => {
            editor.dispose();
            provider.disconnect();
            completionProvider.dispose();
        };
    }, [projectId, fileId]);

    return <div ref={editorRef} style={{ height: '100%' }} />;
};

export default CodeEditor;