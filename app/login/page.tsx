"use client";

import React from "react";
import Link from "next/link";
import AnimatedComponent from "@/components/AnimatedComponent";
import { motion } from "framer-motion";

function Login() {
  return (
    <div className="login flex h-[90vh] items-center mx-16">
      <section className="w-[50%]">
        <header className="text-center">
          <AnimatedComponent>
            <h1 className="text-3xl font-bold mb-3">Sign in</h1>
          </AnimatedComponent>
          <AnimatedComponent _delay={1.1}>
            <p className="text-[#a4a3a3] font-extralight text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </AnimatedComponent>
        </header>

        {/* Google sign in */}
        <AnimatedComponent _delay={1.2}>
          <div className="google-login border-[1px] w-[300px] mx-auto my-4 text-sm rounded-full  py-2 flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt=""
              width={20}
              height={20}
            />
            <span className="ml-3">Login with Google</span>
          </div>
        </AnimatedComponent>

        {/* Hr */}
        <AnimatedComponent _delay={1.3}>
          <div className="hr flex items-center justify-center">
            <div className="hr-line h-[1px] w-[210px] bg-[#eee]"></div>
            <div className="mx-3">OR</div>
            <div className="hr-line hr-line h-[1px] w-[210px] bg-[#eee]"></div>
          </div>
        </AnimatedComponent>

        {/* Form */}
        <form action="#" className="mx-auto w-[500px] py-4 mt-4">
          <AnimatedComponent _delay={1.4}>
            <label htmlFor="email" className="mb-2 block">
              Email <span className="text-[red]">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="block w-100 font-light border-[1px] w-[100%] py-3 px-4 rounded-full text-sm"
              autoComplete="new-password"
            />
          </AnimatedComponent>
          <AnimatedComponent _delay={1.5}>
            <label htmlFor="Password" className="mb-2 block mt-4">
              Password <span className="text-[red]">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="block w-100 font-light border-[1px] w-[100%] py-3 px-4 rounded-full text-sm"
              autoComplete="off"
            />
          </AnimatedComponent>
          <AnimatedComponent _delay={1.6}>
            <input
              type="submit"
              value={"Sign in"}
              className="btn-primary rounded-full mt-6 w-[100%] hover:bg-[#333] cursor-pointer"
            />
          </AnimatedComponent>
        </form>

        {/* <AnimatedComponent _delay={1.7}> */}
        <div className="text-center text-sm mt-4">
          Don't have an Account?{" "}
          <Link href="signup" className="text-[blue]">
            Sign up
          </Link>
        </div>
        {/* </AnimatedComponent> */}
      </section>

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
        className="w-[50%] bg-cover bg-center h-[90%] rounded-2xl"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1501441858156-e505fb04bfbc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBzdW5nbGFzc2VzfGVufDB8fDB8fHww)`,
        }}
      ></motion.section>
    </div>
  );
}

export default Login;
