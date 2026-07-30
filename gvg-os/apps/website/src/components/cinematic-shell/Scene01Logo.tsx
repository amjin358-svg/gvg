"use client";

import { motion } from "framer-motion";

export default function Scene01Logo() {
  return (
    <section className="absolute inset-0 flex items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
        }}
        className="text-[12vw] font-black tracking-[1rem] text-white drop-shadow-[0_0_80px_rgba(255,215,0,.7)]"
      >
        GVG
      </motion.h1>
    </section>
  );
}
