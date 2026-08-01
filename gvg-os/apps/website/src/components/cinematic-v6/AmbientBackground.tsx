"use client";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#111111]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-[1200px] h-[1200px] rounded-full blur-[250px] bg-yellow-500/20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
