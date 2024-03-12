"use client";
import React from "react";
import { Rate } from "antd";
import { motion } from "framer-motion";

type ProductProps = {
  imgUrl: string;
  category: string;
  name: string;
  rating: number;
  price: number;
  index: number;
};

function ProductCard({
  imgUrl,
  category,
  name,
  rating,
  price,
  index,
}: ProductProps) {
  return (
    <motion.div
      className="product-card  h-[300px] rounded-2xl p-5 py-4 flex flex-col space-y-2"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        duration: 2,
        delay: 2 + Number("0." + index),
      }}
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
  );
}

export default ProductCard;