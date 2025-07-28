import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroCard: React.FC = () => { 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 items-center justify-between bg-gradient-to-r from-sky-100 to-sky-200 dark:from-sky-800 dark:to-sky-700 rounded-2xl gap-8 mx-2">
      <div className="col-span-1 lg:col-span-7 flex flex-col text-left px-4 lg:px-8 py-8 md:py-12 font-thin">
        <span className="text-xl md:text-2xl mb-2">Hi <span role="img" aria-label="wave">👋</span></span>
        <span className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
          I&apos;m Ganessh Kumar
        </span>
        <h2 className="text-xl md:text-2xl mt-12 tracking-tighter opacity-90">
          A full-stack developer passionate about building AI-powered solutions and modern web applications, with a strong emphasis on performance and user experience.
        </h2>
        <h2 className="text-xl md:text-2xl tracking-tighter opacity-90 mt-4">
          Working on&nbsp;
          <a className="bg-white py-1 px-2 rounded-lg inline-flex items-center" href="https://www.microsoft.com/en-us/microsoft-fabric/resources/data-101/what-is-fabric?msockid=0908642ade4f62150b047107dff5635a">
            <img src="/assets/images/microsoft-fabric.png" alt="Microsoft Fabric Logo" className="inline-block w-6 h-6 align-middle" />
            &nbsp;
            Microsoft Fabric
          </a>
          &nbsp;
          and
          &nbsp;
          <a className="bg-white py-1 px-2 rounded-lg inline-flex items-center" href="https://obsidianstats.com">
            <img src="/assets/images/obsidian-stats-64.png" alt="Obsidian Stats Logo" className="inline-block w-6 h-6 align-middle" />
            &nbsp;
            Obsidian Stats
          </a>
        </h2>
        <div className="mt-12 flex gap-4">
          <Button asChild className="text-xl px-6 py-3 rounded"><a href="/about">About me</a></Button>
          <Button asChild className="text-xl px-6 py-3 rounded"><a href="/contact">Contact me</a></Button>
        </div>
        
      </div>
      <div className="col-span-1 lg:col-span-3 h-full flex justify-center items-end">
        <Image
          src="/ganesshkumar-emoji.png"
          alt="Avatar"
          width={400}
          height={400}
          className="rounded-xl"
          priority
        />
      </div>
    </div>
  );
};

export default HeroCard;
