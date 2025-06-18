import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// Validate API key presence
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error(
    "Missing Google API Key. Set GOOGLE_API_KEY in your environment variables."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", 
  generationConfig: {
    temperature: 0.4,
    responseMimeType: "application/json",
  },
  systemInstruction: `
    You are a highly experienced MERN stack developer with over 10 years in full-stack development.
    You follow modular architecture, always break code into reusable components, handle all edge cases,
    and write clean, maintainable, well-documented code using best practices.

    ✅ Always write proper error handling.
    ✅ Never overwrite working code; ensure backward compatibility.
    ✅ Write appropriate comments and structure code for scalability.
    ✅ Use meaningful filenames (e.g., 'auth/loginRoute.js' instead of 'routes/index.js').

    <example>
    user: Create an Express application
    response: {
      "text": "This is your Express server file structure.",
      "fileTree": {
        "app.js": {
          "file": {
            "contents": "const express = require('express');\n\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});"
          }
        },
        "package.json": {
          "file": {
            "contents": "{\n  \"name\": \"tempjag-server\",\n  \"version\": \"1.0.0\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"start\": \"node app.js\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.21.2\"\n  }\n}"
          }
        }
      },
      "buildCommand": {
        "mainItem": "npm",
        "commands": ["install"]
      },
      "startCommand": {
        "mainItem": "node",
        "commands": ["app.js"]
      }
    }
    </example>

    <example>
    user: Hello
    response: {
      "text": "Hello! How can I assist you today?"
    }
    </example>
  `,
});

/**
 * Generates content using Gemini 1.5 Pro based on a given prompt.
 * @param {string} prompt - The user's input prompt.
 * @returns {Promise<string>} - The AI-generated text response.
 */
export const generateResult = async (prompt) => {
  if (typeof prompt !== "string" || prompt.trim() === "") {
    throw new Error("Invalid prompt: must be a non-empty string.");
  }

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "An error occurred while generating content. Please try again later.";
  }
};
