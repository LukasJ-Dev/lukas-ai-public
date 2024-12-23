import { FlipWords } from "@/components/ui/flip-words";
import { StarsBackground } from "@/components/ui/stars-background";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Portfolio() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center h-screen gap-10">
        <StarsBackground />
        <div className=" flex flex-col items-center justify-center gap-5 mb-20">
          <Image
            src="/lukas.png"
            alt="Profile"
            width={128}
            height={128}
            className="grayscale rounded-full"
          />
          <Link href="/">
            <Button color="green">Chat with Lukas AI</Button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center h-screen mb-20">
          <h1 className="text-6xl font-bold text-green-600">Lukas Johansson</h1>
          <h2 className="text-4xl font-bold">Full Stack Developer</h2>
          <p className="text-xl">
            Develops software with
            <FlipWords
              words={[
                "Next.js",
                "LangChain",
                "React",
                "Typescript",
                "Express",
                "Python",
                "Javascript",
              ]}
              className="text-2xl font-bold text-green-600 w-max"
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
