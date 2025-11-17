
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateMockup(
    logoBase64: string,
    logoMimeType: string,
    prompt: string
): Promise<string> {
    const model = 'gemini-2.5-flash-image';

    const imagePart = {
        inlineData: {
            data: logoBase64,
            mimeType: logoMimeType,
        },
    };

    const textPart = {
        text: `Given this logo, place it realistically on the following item: ${prompt}. Ensure the final output is a photorealistic image and does not contain any text explanations.`,
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [imagePart, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        // Find the image part in the response
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                return `data:${mimeType};base64,${base64ImageBytes}`;
            }
        }

        throw new Error("No image data found in the API response.");
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate mockup from the API.");
    }
}