"use client";
import React from "react";
import { getProductById } from "../.././../firebase/dbOperations";
import { Product } from "@/interface/Product";
import Numeral from "react-numeral";
import AddToFavoriteButton from "@/components/product-detail/AddToFavoriteButton";

type Params = {
  params: {
    id: string;
  };
};

async function ProductDetail({ params }: Params) {
  const id = params.id;

  const product: Product | null = (await getProductById(id)) || null;

  return (
    <div className="mx-14 product-detail">
      <header className="text-slate-400 font-extralight text-sm mt-8">
        Home / {product?.category} / {product?.subcategories[0]}
      </header>

      <main className="mt-16 flex justify-between">
        {/* Image */}
        <section className="image">
          <div
            className=" bg-center bg-contain bg-no-repeat current-image"
            style={{ backgroundImage: `url(${product?.images[0]})` }}
          ></div>
        </section>
        {/* Info */}
        <section className="info w-[50%]">
          <div className="text-3xl font-bold">{product?.name}</div>
          <div className="text-3xl font-bold mt-8 mb-8">
            {/* $ <Numeral value={product?.price} format={"0,0"} /> */}
            $ <Numeral value={product?.price} format={"0,0"} />
          </div>
          <AddToFavoriteButton />
        </section>
      </main>
    </div>
  );
}

export default ProductDetail;
