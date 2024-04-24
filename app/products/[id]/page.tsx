"use client";
import React, { useEffect, useState } from "react";
import { getProductById } from "../.././../firebase/dbOperations";
import { Product } from "@/interface/Product";
import Numeral from "react-numeral";
import AddToFavoriteButton from "@/components/product-detail/AddToFavoriteButton";
import { Rate } from "antd";
import RelatedProductsItems from "@/components/RelatedProducts";
import AnimatedComponent from "@/components/AnimatedComponent";

type Params = {
  params: {
    id: string;
  };
};

function ProductDetail({ params }: Params) {
  const id = params.id;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [product, setProduct] = useState<Product | null>(null);

  // fixing async await problem on client side
  useEffect(() => {
    scrollTo(0, 0);
    getProductById(id).then((res) => setProduct(res));
  }, []);

  return (
    <div className="product-detail">
      <AnimatedComponent _delay={0}>
        <header className="text-slate-400 font-extralight text-sm mt-8 mx-14">
          Home / {product?.category} / {product?.subcategories[0]}
        </header>
      </AnimatedComponent>

      <main className="mt-16 flex justify-between mx-16">
        {/* Image */}
        <section className="image">
          <AnimatedComponent _delay={2}>
            <div
              className=" bg-center bg-contain bg-no-repeat current-image"
              style={{
                backgroundImage: `url(${product?.images[currentImageIndex]})`,
              }}
            ></div>
          </AnimatedComponent>
          {/* Images */}
          <div className="all-images flex justify-center space-x-10 mt-8">
            {product?.images.map((img, index) => (
              <AnimatedComponent _delay={3 + index / 2}>
                <img
                  src={img}
                  className={`h-10 cursor-pointer product-detail-image ${
                    index == currentImageIndex
                      ? "product-detail-active-image"
                      : ""
                  }`}
                  key={"image_" + Math.random()}
                  onClick={() => setCurrentImageIndex(index)}
                />
              </AnimatedComponent>
            ))}
          </div>
        </section>
        {/* Info */}
        <section className="info w-[50%]">
          <AnimatedComponent>
            <div className="text-3xl font-bold">{product?.name}</div>
          </AnimatedComponent>

          <AnimatedComponent _delay={1.3}>
            <div className="text-3xl font-bold mt-8 mb-8">
              {/* $ <Numeral value={product?.price} format={"0,0"} /> */}
              $ <Numeral value={product?.price} format={"0,0"} />
            </div>
          </AnimatedComponent>

          <AnimatedComponent _delay={1.6}>
            <AddToFavoriteButton />
          </AnimatedComponent>

          <AnimatedComponent _delay={1.9}>
            <p className="mt-8 leading-7 text-gray-400 font-extralight mb-6">
              {product?.description}
            </p>
          </AnimatedComponent>

          <div className="flex">
            {product?.rating && (
              <AnimatedComponent _delay={1}>
                <Rate
                  allowHalf
                  defaultValue={Number(product?.rating)}
                  disabled
                  className="text-3xl"
                />
              </AnimatedComponent>
            )}{" "}
            <AnimatedComponent _delay={2.6}>
              <span className="block mt-2 ml-5">(2.5K Reviews)</span>
            </AnimatedComponent>
          </div>
          <div className="buttons mt-12 space-x-8 flex">
            <AnimatedComponent _delay={3}>
              <button className="btn-primary buy-now-btn">Buy Now</button>
            </AnimatedComponent>

            <AnimatedComponent _delay={3.3} _style={{ display: "inline" }}>
              <button className="btn-secondary compare-product-btn">
                Compare Product
              </button>
            </AnimatedComponent>
          </div>
        </section>

        {/* Related Products */}
      </main>
      <AnimatedComponent _delay={0}>
        <div className="related-products ml-14 my-32 overflow animation-element">
          <RelatedProductsItems currentObjectID={product?.objectID || ""} />
        </div>
      </AnimatedComponent>
    </div>
  );
}

export default ProductDetail;
