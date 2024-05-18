import { User } from "firebase/auth";
import { IProduct } from "@/interface/IProduct";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import ICompareProductItem from "@/interface/ICompareProductItem";
import { GoogleGenerativeAI } from "@google/generative-ai";

class ProductComparisonService {
  static async addToComparison(user: User, product: IProduct) {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(db, "users", user.uid);
        const comparisonProducts = await this.getProducts(user);

        // check if the current product already exists in the comparison cart
        const found = comparisonProducts.find(
          (p: ICompareProductItem) => p.id == product.id
        );

        // add the product to the comparison cart if not exists
        if (!found) {
          await updateDoc(docRef, {
            comparison: [...comparisonProducts, { id: product.id }],
          });

          resolve("Added to compare list successfully");
        } else {
          reject("Product already exists in the comparison list");
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  static async getProducts(user: User) {
    try {
      const docRef = doc(db, "users", user.uid);
      const result = await getDoc(docRef);

      if (result.exists()) {
        const comparisonList = result.data().comparison;
        return comparisonList ? comparisonList : [];
      } else return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  static async suggest(productsItems: IProduct[], userInput: string) {
  
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAhGhLsnEMCzPNot1DYKzBmjdzmAEl0Ib0"
    );

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      `I am using you to analyse about products in my ecommerce website. Now these are the data of the products: ${JSON.stringify(
        productsItems
      )}. User will give you prompt. Answer the question from the given products only. Important: Give in html div with the important points in bold properly formatted with proper line breaks with <br> but do not include html as a text. Don't use product 1, product 2.. Just use the actual product names for better understanding. Now: User Input is:` +
      userInput;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
}

export default ProductComparisonService;
