"use client";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Fade } from "react-awesome-reveal";
import { Spotlight } from "@/app/components/ui/Spotlight";
import { SparklesCore } from "@/app/components/ui/sparkles";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import TextShimmer from "@/app/components/ui/text-shimmer";
import Link from "next/link";

const words =
  "Recherchez votre Amour à la vitesse de la lumière⚡";
export const SpotlightPreview = () => {
  return (
    <Fade triggerOnce>
        <div className="h-[35rem] md:h-[45rem] relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          <Spotlight
            className="-top-20 left-0 md:-top-20 md:left-50"
            fill="pink"
          />

          <div className="w-full absolute inset-0 h-screen">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={3.5}
              particleDensity={20}
              className="w-full h-full"
              particleColor="#FFC0CB"
            />
          </div>
          <div className="relative flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center text-white relative z-20 w-[85%] lg:w-[70%]">
              <span className="py-1 rounded-xl hover:rounded-black animation ease font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-pink-800 text-3xl md:text-4xl lg:text-6xl">
              AmourConnect
              </span>
            </h1>
            <div className="absolute inset-x-0 bottom-[60%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-[50%] blur-sm translate-x-1/2" />
            <div className="absolute inset-x-0 bottom-[60%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-[50%] translate-x-1/2" />
            <div className="absolute inset-x-0 bottom-[60%] bg-gradient-to-r from-transparent via-pink-500 to-transparent h-[5px] w-[50%] blur-sm translate-x-1/2" />
            <div className="absolute inset-x-0 bottom-[60%] bg-gradient-to-r from-transparent via-pink-500 to-transparent h-px w-[50%] translate-x-1/2" />

            <div className="mt-8 flex flex-col items-center">
              <TextGenerate />
              <TextShimmerBadge />
            </div>
          </div>
        </div>
    </Fade>
  );
}

export const TextGenerate = () => {
  return (
    <div className="w-[80%] text-center">
      <TextGenerateEffect words={words} />
    </div>
  );
}

export const TextShimmerBadge = () => {
  return (
    <div className="z-10 my-5 flex items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-white/5 bg-neutral-900 text-base text-white transition-all ease-in hover:bg-neutral-800"
        )}
      >
        <TextShimmer className="inline-flex items-center justify-center px-4 py-1">
          <span>
            <Link href="welcome">
            ❤️ Commencez votre voyage amoureux
            </Link>
          </span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </div>
    </div>
  );
}
