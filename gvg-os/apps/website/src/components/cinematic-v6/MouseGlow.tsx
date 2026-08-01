"use client";

import { motion } from "framer-motion";

export default function MouseGlow() {
  return (
    <motion.div
      className="fixed w-80 h-80 rounded-full pointer-events-none blur-3xl bg-yellow-400/20"
    />
  );
}
