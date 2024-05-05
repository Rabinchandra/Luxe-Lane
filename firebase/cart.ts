import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { User } from "firebase/auth";
import { Product } from "@/interface/Product";

interface CartProduct extends Product {
  quantity?: number;
}

class Cart {
  // Add to Cart feature
  static async addToCart(user: User, cartItem: Product) {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // Get the cart items from the firestore - it may be undefined or array of cart items
      const cart = (await this.getCart(user)) || undefined;

      // if cart does not exists - meaning cart attribute doesn't exists on the doc - (means the item is not in the cart list)
      // or if cart is empty
      if (!cart || cart.length == 0) {
        await updateDoc(docRef, {
          cart: [{ ...cartItem, quantity: 1 }], // Add a quantity attribute
        });
      } else {
        // Let's say the cart is not empty
        // Check if current item exists in the cart
        // if exists, then just increase the quantity, else add the cartitem object with quantity attribute
        const currentCartItem = cart.find((c) => c.id == cartItem.id);
        console.clear();
        console.log(currentCartItem);

        // if current item exists
        if (currentCartItem) {
          const quantity = currentCartItem.quantity || 0;

          await updateDoc(docRef, {
            cart: [
              {
                ...currentCartItem,
                quantity: quantity + 1,
              },
            ],
          });
        }
        // if item doesn't exists
        else {
          await updateDoc(docRef, {
            cart: [
              {
                ...cartItem,
                quantity: 1,
              },
            ],
          });
        }

        /*const newItem =
          currentCartItem == undefined
            ? [...cart, { ...cartItem, quantity: 1 }] // if cart item doesn't exists, add a new one with quantity attribute
            : [
                ...cart,
                {
                  ...currentCartItem,
                  quantity: (currentCartItem?.quantity || 0) + 1,
                },
              ]; // if exists, just increase the cartitem quantity */
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
