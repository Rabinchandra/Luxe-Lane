"use client";

import React from "react";
import Link from "next/link";
import AnimatedComponent from "@/components/AnimatedComponent";
import { motion } from "framer-motion";

function Signup() {
  return (
    <div className="login flex h-[90vh] items-center mx-16">
      {/* Image */}
      <motion.section
        initial={{
          transform: "scale(.7)",
          opacity: 0,
        }}
        animate={{
          transform: "scale(1)",
          opacity: 1,
        }}
        transition={{
          stiffness: 100,
          delay: 2,
          type: "spring",
        }}
        className="w-[50%] bg-cover bg-right h-[90%] rounded-2xl"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/happy-woman-posing-while-wearing-sunglasses_23-2148450360.jpg?t=st=1714566447~exp=1714570047~hmac=a41acb93b4e8752d863df6fdeae82960f411c6e9f5d269927dd3dd24a9f75cd2&w=1480)`,
        }}
      ></motion.section>

      <section className="w-[50%]">
        <header className="text-center">
          <AnimatedComponent>
            <h1 className="text-3xl font-bold mb-3">Sign Up</h1>
          </AnimatedComponent>
          <AnimatedComponent _delay={1.1}>
            <p className="text-[#a4a3a3] font-extralight text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </AnimatedComponent>
        </header>

        {/* Form */}
        <form action="#" className="mx-auto w-[500px] py-4 mt-4">
          <AnimatedComponent _delay={1.4}>
            <label htmlFor="name" className="mb-2 block">
              Name <span className="text-[red]">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your name"
              className="block w-100 font-light border-[1px] w-[100%] py-3 px-4 rounded-full text-sm"
              autoComplete="new-password"
              id="name"
            />
          </AnimatedComponent>
          <AnimatedComponent _delay={1.5}>
            <label htmlFor="email" className="mb-2 block mt-3">
              Email <span className="text-[red]">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="block w-100 font-light border-[1px] w-[100%] py-3 px-4 rounded-full text-sm"
              autoComplete="new-password"
              id="email"
            />
          </AnimatedComponent>
          <AnimatedComponent _delay={1.6}>
            <label htmlFor="password" className="mb-2 block mt-4">
              Password <span className="text-[red]">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="block w-100 font-light border-[1px] w-[100%] py-3 px-4 rounded-full text-sm"
              autoComplete="off"
              id="password"
            />
          </AnimatedComponent>
          <AnimatedComponent _delay={1.6}>
            <label htmlFor="re-password" className="mb-2 block mt-4">
              Re-enter Password <span className="text-[red]">*</span>
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="block w-100 font-light border-[1px] w-[100%] py-3 px-4 rounded-full text-sm"
              autoComplete="off"
              id="re-password"
            />
          </AnimatedComponent>
          <AnimatedComponent _delay={1.6}>
            <input
              type="submit"
              value={"Sign Up"}
              className="btn-primary rounded-full mt-6 w-[100%] hover:bg-[#333] cursor-pointer"
            />
          </AnimatedComponent>
        </form>

        {/* Hr */}
        <AnimatedComponent _delay={1.3}>
          <div className="hr flex items-center justify-center">
            <div className="hr-line h-[1px] w-[210px] bg-[#eee]"></div>
            <div className="mx-3">OR</div>
            <div className="hr-line hr-line h-[1px] w-[210px] bg-[#eee]"></div>
          </div>
        </AnimatedComponent>

        {/* Google sign in */}
        <AnimatedComponent _delay={1.2}>
          <div className="google-login border-[1px] w-[300px] mx-auto my-6 text-sm rounded-full  py-2 flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt=""
              width={20}
              height={20}
            />
            <span className="ml-3">Sign up with Google</span>
          </div>
        </AnimatedComponent>

        {/* <AnimatedComponent _delay={1.7}> */}
        <div className="text-center text-sm mt-4">
          Already have an Account?{" "}
          <Link href="login" className="text-[blue]">
            Sign in
          </Link>
        </div>
        {/* </AnimatedComponent> */}
      </section>
    </div>
  );
}

export default Signup;
