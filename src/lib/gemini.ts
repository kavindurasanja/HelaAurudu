import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAvuruduSong(theme: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, festive Sinhala Avurudu song or poem (Kavi) based on the theme: "${theme}". 
      The output should be in Sinhala Unicode. 
      Include a title and 2-3 verses. 
      Make it sound traditional and joyful, mentioning elements like Koha, Erabadu flowers, and traditional games if relevant.`,
    });

    return response.text || "සමාවන්න, ගීතය ජනනය කිරීමට නොහැකි විය.";
  } catch (error) {
    console.error("Error generating song:", error);
    return "Error generating song. Please try again.";
  }
}
