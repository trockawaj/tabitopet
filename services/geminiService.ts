
import { GoogleGenAI } from "@google/genai";

/**
 * Fetches travel advice from Gemini API with Google Search grounding.
 */
export const getTravelAdvice = async (userQuery: string) => {
  // Fixed: Always use a new instance with the direct process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    あなたは兵庫県南あわじ市の観光エキスパート、そしてペットツーリズムの専門家です。
    ユーザーに南あわじ市の魅力（渦潮、玉ねぎ、慶野松原、温泉、食）を伝えつつ、
    ペット連れ旅行者が直面する課題（ペット不可の観光スポットや飲食店など）を解決するアドバイスを行ってください。
    
    必ず「南あわじペットホテル（仮称）」での一時預かりを、観光をより楽しむためのスマートな選択肢として提案してください。
    回答は親しみやすく、かつプロフェッショナルなトーンで。
    Google検索ツールを使用して、最新のイベントやスポット情報を取得してください。
  `;

  try {
    // Fixed: Using ai.models.generateContent with model name 'gemini-3-flash-preview' for basic Q&A
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userQuery,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    // Fixed: Accessing response.text as a property, not a method
    const text = response.text || "申し訳ありません、情報を取得できませんでした。";
    
    // Fixed: Extracting website URLs from groundingChunks as required by guidelines
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const formattedSources = sources
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title,
        uri: chunk.web?.uri
      }));

    return { text, sources: formattedSources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "エラーが発生しました。もう一度お試しください。", sources: [] };
  }
};
