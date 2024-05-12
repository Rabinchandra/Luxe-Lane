"use client";

import React, { useState } from "react";
import Link from "next/link";
import AnimatedComponent from "@/components/AnimatedComponent";
import { motion } from "framer-motion";
import {
  createUser,
  saveUserToDoc,
  signInWithGoogle,
} from "@/services/authServices";
import { message } from "antd";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isBeingSubmitted, setIsBeingSubmitted] = useState(false); // to track while submitting form - used for loading/spinner

  // no server actions - used traditional method of form submit
  const handleFormSubmit = () => {
    console.clear();
    // Data Validation
    if (password !== repassword) {
      error("Password should be matched!");
      return;
    }

    setIsBeingSubmitted(true);

    // create user
    createUser(email, password, name)
      .then((msg) => {
        success(msg);
      })
      .catch((err) => error(err))
      .finally(() => setIsBeingSubmitted(false));
  };

  const onSignInWithGoogle = () => {
    signInWithGoogle()
      .then(async (userCredential) => {
        // Signed in successfully
        const user = userCredential.user;

        // Once sign up done, save new user info the firestore
        await saveUserToDoc(user);

        success("User created Successfully!");
      })
      .catch((err) => {
        // Handle errors
        error(err.message);
      });
  };

  // Antd error message
  const error = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  // Antd success message
  const success = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  return (
    <div className="login flex h-[90vh] items-center mx-16">
      {contextHolder}
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
          backgroundImage: `url(signup.jpg)`,
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
        <form action={handleFormSubmit} className="mx-auto w-[500px] py-4 mt-4">
          <AnimatedComponent _delay={1.4}>
            <label htmlFor="name" className="mb-2 block">
              Name <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="block w-100 font-light border-[1px] w-[100%] py-3 px-4 rounded-full text-sm"
              autoComplete="new-password"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
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
              onChange={(e) => setEmail(e.target.value)}
              required
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
              onChange={(e) => setPassword(e.target.value)}
              required
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
              onChange={(e) => setRepassword(e.target.value)}
              required
            />
          </AnimatedComponent>
          <AnimatedComponent _delay={1.6}>
            <input
              type="submit"
              value={isBeingSubmitted ? "Signing up..." : "Sign Up"}
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
          <div
            className="google-login border-[1px] w-[300px] mx-auto my-6 text-sm rounded-full  py-2 flex justify-center"
            onClick={onSignInWithGoogle}
          >
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
