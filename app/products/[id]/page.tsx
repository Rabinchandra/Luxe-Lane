"use client";
import React, { useEffect } from "react";
import { getProductById } from "../.././../firebase/dbOperations";
import { Product } from "@/interface/Product";
import Numeral from "react-numeral";
import AddToFavoriteButton from "@/components/product-detail/AddToFavoriteButton";
import { Rate } from "antd";
import RelatedProductsItems from "@/components/RelatedProducts";

type Params = {
  params: {
    id: string;
  };
};

async function ProductDetail({ params }: Params) {
  const id = params.id;

  const product: Product | null = (await getProductById(id)) || null;

  return (
    <div className="product-detail">
      <header className="text-slate-400 font-extralight text-sm mt-8 mx-14">
        Home / {product?.category} / {product?.subcategories[0]}
      </header>

      <main className="mt-16 flex justify-between mx-16">
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
          <p className="mt-8 leading-7 text-gray-400 font-extralight mb-6">
            {product?.description}
          </p>
          <div className="flex">
            <Rate
              allowHalf
              defaultValue={Number(product?.rating)}
              disabled
              className="text-3xl"
            />{" "}
            <span className="block mt-2 ml-5">(2.5K Reviews)</span>
          </div>
          <div className="buttons mt-12 space-x-8">
            <button className="btn-primary buy-now-btn">Buy Now</button>
            <button className="btn-secondary compare-product-btn">
              Compare Product
            </button>
          </div>
        </section>

        {/* Related Products */}
      </main>
      <div className="related-products ml-14 my-32 overflow">
        <RelatedProductsItems currentObjectID={product?.objectID || ""} />
      </div>
    </div>
  );
}

export default ProductDetail;
