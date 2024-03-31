"use client";

import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export interface ThreeDCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
}

export function ThreeDCard({
  title,
  description,
  imageUrl,
  buttonText,
}: ThreeDCardProps) {
  return (
    <CardContainer className="inter-var m-3">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-white/[0.2] bg-black/[0.3] p-6 hover:shadow-2xl hover:shadow-emerald-500/[0.1] sm:w-[30rem]  ">
        <CardItem translateZ="50" className="text-xl font-bold text-white">
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src={imageUrl}
            height="500"
            width="500"
            className="h-40 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="mt-20 flex items-center justify-between">
          <a
            href="#contact"
            className="cursor-pointer rounded-xl bg-white px-4 py-2 text-xs font-bold text-black"
          >
            {buttonText}
          </a>
        </div>
      </CardBody>
    </CardContainer>
  );
}
