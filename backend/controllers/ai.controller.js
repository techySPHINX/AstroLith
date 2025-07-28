import * as ai from '../services/ai.service.js';


export const getResult = async (req, res) => {
    try {
        const { prompt } = req.query;
        const result = await ai.generateResult(prompt);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const codeCompletion = async (req, res) => {
    try {
        const { codeSnippet, language } = req.body;
        const result = await ai.generateCodeCompletion(codeSnippet, language);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const debugCode = async (req, res) => {
    try {
        const { code, errorDetails } = req.body;
        const result = await ai.debugCode(code, errorDetails);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const reviewCode = async (req, res) => {
    try {
        const { code, context } = req.body;
        const result = await ai.reviewCode(code, context);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};