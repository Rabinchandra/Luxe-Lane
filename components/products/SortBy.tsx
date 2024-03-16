"use client";
import { Radio } from "antd";
import React from "react";
import { motion } from "framer-motion";

function SortBy() {
  return (
    <div className="mt-10">
      <motion.header
        className="font-bold mb-4"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ type: "spring", delay: 1.7 }}
      >
        Sort By
      </motion.header>
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ type: "spring", delay: 2 }}
      >
        <Radio.Group options={["Lower Price", "Higher Price", "Latest"]} />
      </motion.section>
    </div>
  );
}

export default SortBy;
