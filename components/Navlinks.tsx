"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Navlink {
  title: string;
  isActive: boolean;
  link: string;
}

function Navlinks() {
  const [links, setLinks] = useState<Navlink[]>([
    {
      title: "Products",
      isActive: false,
      link: "/products",
    },
    {
      title: "Sales",
      isActive: false,
      link: "/sales",
    },
    {
      title: "About us",
      isActive: false,
      link: "/about-us",
    },
    {
      title: "FAQ",
      isActive: false,
      link: "/faq",
    },
  ]);

  // Change active link handler
  const handleActiveLink = (current: string) => {
    const updated = links.map((l) => {
      l.link === current ? (l.isActive = true) : (l.isActive = false);
      return l;
    });

    setLinks(updated);
  };

  // on page load, the active link is modified according to current path
  useEffect(() => {
    const updated = links.map((l) => {
      window.location.pathname.includes(l.link)
        ? (l.isActive = true)
        : (l.isActive = false);
      return l;
    });
    setLinks(updated);
  }, []);

  return (
    <div className="links text-gray-400 space-x-8 ml-16 flex items-center">
      {links.map((l, key) => (
        <motion.div
          // key={`navlink-${key}-${~~(Math.random() * 100)}`}
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 20 }}
          transition={{
            type: "spring",
            duration: 2,
            delay: Number("0." + key),
          }}
        >
          <Link
            href={l.link}
            className={
              l.isActive ? "relative nav-active text-sm" : "relative text-sm"
            }
            onClick={() => handleActiveLink(l.link)}
          >
            {l.title}
            <div className="underline w-[0%] h-[2px] bg-black mt-1 absolute"></div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default Navlinks;
