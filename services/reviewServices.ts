import { GoogleGenerativeAI } from "@google/generative-ai";

export default class ReviewService {
  static async analyse(userInput: string) {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAhGhLsnEMCzPNot1DYKzBmjdzmAEl0Ib0"
    );

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Prompt: Review Content Analysis Analyze the following user review for suitability on our e-commerce website. Reviews can be negative, but they should provide constructive feedback. Review Text: "{user_review_text}" Desired Output: * status: "appropriate" or "inappropriate" * feedback: (optional, only for "inappropriate" status) A brief explanation for why the review is inappropriate. Examples: * Acceptable Review: "The product arrived damaged. The customer service was helpful and resolved the issue quickly." (status: "appropriate") * Unacceptable Review: "This product is the worst! Total garbage! Don't buy it!" (status: "inappropriate", feedback: "Lacks constructive feedback and resorts to hyperbole.") Note: * The feedback section should explain why the review is considered inappropriate and offer suggestions for improvement (e.g., suggesting specific aspects for feedback).
    Now: this is user input: ${userInput}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
}
