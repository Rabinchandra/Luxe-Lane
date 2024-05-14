"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Cart from "@/services/cartServices";
import { UserAuthContext } from "@/context/UserAuthContext";
import { ICartItem } from "@/interface/ICartItem";

export default function CartPage() {
  const [_cart, setCart] = useState<ICartItem[]>([]);
  const { user } = useContext(UserAuthContext);

  useEffect(() => {
    if (user) {
      Cart.getCart(user).then((res) => setCart(res));
    }
  }, [user]);

  return (
    <div className="mx-24 mb-24">
      <section>
        <h1 className="text-3xl font-bold mt-11">Cart</h1>
        <p className="py-5">There is 3 cart items in your cart</p>
      </section>
      <table className="w-[90%] mt-10 mx-24" border={1}>
        <thead>
          <tr className="">
            <th className="text-left w-[400px]">Products</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {_cart.map((item: any) => (
            <tr>
              <td className="flex w-30 py-6">
                <img src={item.images[0]} className="w-20 block mr-5" />
                <div className="">
                  <span className="font-bold block">{item.name}</span>
                  <span className="block mt-3 text-gray-500">
                    $ {item.price}
                  </span>
                </div>
              </td>
              <td className="py-3 text-center">{item.quantity}</td>
              <td className="py-3 text-center">
                $ {item.quantity * item.price}
              </td>
              <td>
                <Image src="/trash.png" alt="" width={20} height={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Summary */}
      <section className="order-summary mx-14">
        <h1 className="text-2xl font-bold mt-16 mb-8">Order Summary</h1>
        <div className="text-gray-500 flex justify-between py-2">
          <div>Subtotal</div>
          <div>$2300</div>
        </div>

        <div className="text-gray-500 flex justify-between py-3">
          <div>Delivery Charge</div>
          <div>$0</div>
        </div>

        <div className="text-gray-500 flex justify-between py-3 border-b-2">
          <div>Discount</div>
          <div>$0</div>
        </div>

        <div className="flex justify-between py-5 text-xl font-bold">
          <div>Grand Total</div>
          <div>$1200</div>
        </div>
      </section>

      <section className="mx-14 my-14">
        <div className="inline-flex border-[1.5px] py-3 w-[300px] justify-between px-2">
          <input
            type="text"
            placeholder="Have a coupon code?"
            className="outline-0 text-sm px-4"
          />
          <span className="block mx-3 text-sm cursor-pointer">Apply</span>
        </div>

        <button
          className="btn-primary block mt-10"
          style={{ paddingLeft: 22, paddingRight: 22 }}
        >
          Proceed to Checkout
        </button>
      </section>
    </div>
  );
}
