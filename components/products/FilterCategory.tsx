"use client";
import React from "react";
import { Checkbox } from "antd";
import { motion } from "framer-motion";

function FilterCategory() {
  const catgories = [
    "Laptop",
    "Phones",
    "Men's Clothes",
    "Women's Clothes",
    "Fiction Books",
    "Books",
    "Shoes",
  ];

  return (
    <div>
      <motion.header
        className="font-bold text-18px] mb-5"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ type: "spring" }}
      >
        Product Categories
      </motion.header>
      <section className="space-y-2">
        {catgories.map((c, index) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 10 }}
            transition={{
              type: "spring",
              duration: 1,
              delay: 0.5 + Number("0." + index),
            }}
          >
            <Checkbox>{c}</Checkbox>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

export default FilterCategory;
