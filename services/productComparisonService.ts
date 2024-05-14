import { User } from "firebase/auth";
import { IProduct } from "@/interface/IProduct";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

interface ICompareProductItem {
  id: string;
}

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
    }
  }
}

export default ProductComparisonService;
