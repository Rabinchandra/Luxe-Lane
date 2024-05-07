import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { User } from "firebase/auth";
import { Product } from "@/interface/Product";
import { CartItem } from "@/interface/ICartItem";

class Cart {
  // Add to Cart feature
  static async addToCart(user: User, quantity: number, cartItem: CartItem) {
    try {
      const docRef = doc(db, "users", user.uid);
      // Get the cart items from the firestore - it may be undefined or array of cart items
      const cart = (await this.getCart(user)) || undefined;
      // if cart does not exists - meaning cart attribute doesn't exists on the doc - (means the item is not in the cart list)
      // or if cart is empty
      if (!cart || cart.length == 0) {
        await updateDoc(docRef, {
          cart: [{ ...cartItem, quantity: 1 }], // Add a quantity attribute
        });
      } else {
        const otherCartItems = cart.filter(
          (c: CartItem) => c.id !== cartItem.id
        );

        await updateDoc(docRef, {
          cart: [...otherCartItems, { ...cartItem, quantity: quantity }],
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async removeFromCart(user: User, quantity: number, cartItem: Product) {
    try {
      const docRef = doc(db, "users", user.uid);
      // Get the cart items from the firestore - it may be undefined or array of cart items
      const cart = (await this.getCart(user)) || undefined;

      const otherCartItems =
        cart?.filter((c: CartItem) => c.id !== cartItem.id) || [];

      if (quantity > 0) {
        await updateDoc(docRef, {
          cart: [...otherCartItems, { ...cartItem, quantity: quantity }],
        });
      } else {
        await updateDoc(docRef, {
          cart: [...otherCartItems],
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Fetch cart
  static async getCart(user: User) {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // get data
      if (docSnap.exists()) {
        return <CartProduct[]>docSnap.data().cart;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default Cart;
