"use client";
import React from "react";
import SearchInput from "./SearchInput";
import Navlinks from "./Navlinks";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function CartLogo({ cartNo }: { cartNo: number }) {
  return (
    <motion.div
      className="flex items-center relative hover:opacity-50"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", delay: 1.7 }}
    >
      <Image
        src={"/cart.svg"}
        width={23}
        height={23}
        alt="s"
        className="cursor-pointer"
      />
      <div className="cart-items-no absolute rounded-full w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center font-bold top-3 right-[-4px]">
        {cartNo}
      </div>
    </motion.div>
  );
}

function Navbar() {
  return (
    <nav className="navbar py-5 px-14  flex items-center bg-white justify-between sticky top-0 z-10 bg-opacity-80 backdrop-filter backdrop-blur-md">
      {/* Logo */}
      <section className="flex items-center">
        <Link
          href="/"
          className="logo text-2xl font-bold text-black cursor-pointer"
        >
          LuxeLane.io
        </Link>
        <Navlinks />
      </section>

      <section className="flex space-x-12">
        <SearchInput />
        {/* Cart */}
        <CartLogo cartNo={4} />

        {/* Favourite */}
        <motion.div
          className="cursor-pointer hover:opacity-75 flex items-center"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", delay: 1.9 }}
        >
          <Image src={"/heart.svg"} width={23} height={23} alt="s" />
        </motion.div>

        {/* Profile */}
        <motion.div
          className="profile w-10 h-10 bg-no-repeat bg-center bg-cover rounded-full hover:opacity-50 cursor-pointer"
          style={{
            backgroundImage:
              "url('https://as2.ftcdn.net/v2/jpg/03/21/22/21/1000_F_321222112_lzcSyCPFs3VUxdiAWA4z72ROLLRv8Hij.jpg')",
          }}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", delay: 2.3 }}
        ></motion.div>
      </section>
    </nav>
  );
}

export default Navbar;
