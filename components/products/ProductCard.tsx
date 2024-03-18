"use client";
import React from "react";
import { Rate } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProductProps {
  id: string;
  imgUrl?: string;
  category?: string;
  name?: string;
  rating?: Number;
  price?: Number;
  index?: Number;
}

function ProductCard({
  id,
  imgUrl,
  category,
  name,
  rating,
  price,
  index,
}: ProductProps) {
  const router = useRouter();

  return (
    <section>
      <motion.div
        className="product-card  h-[300px] rounded-2xl p-5 py-4 flex flex-col space-y-2 overflow-scroll"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{
          type: "spring",
          duration: 2,
          delay: Number("0." + index),
        }}
        onClick={() => router.push("/products/" + id)}
      >
        <div
          className="img bg-no-repeat bg-contain w-[150px] h-[300px] self-center mb-4"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center center",
          }}
        ></div>

        <span className="text-gray-400 block text-[13px]">{category}</span>
        <span className="font-bold block text-sm">{name}</span>
        <Rate allowHalf defaultValue={rating} disabled />
        <span>$ {price}</span>
      </motion.div>
    </section>
  );
}

export default ProductCard;
