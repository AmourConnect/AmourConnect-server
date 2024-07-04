"use client";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

const Footer = () => {
  return (
    <Fade triggerOnce>
    <div className="border-t">
      <div className="mx-auto max-w-2xl py-10 text-white">
        <div className="mt-10 flex flex-col items-center text-sm text-gray-400 md:flex-row md:justify-between">
        <div className="flex justify-center">
          <Image
            alt="AmourConnect logo"
            src="/favicon.ico"
            width={70}
            height={70}
            className="rounded-md bg-white p-1"
          />
        </div>
          <p className="order-2 mt-8 md:order-1 md:mt-0">
            {" "}
            &copy; 2024 AmourConnect. All rights reserved.
          </p>
          <Image
            alt="Github logo"
            src="/assets/images/logo_github.png"
            width={70}
            height={70}
            className="rounded-md bg-white p-1"
            />
          <div className="order-1 md:order-2">
            <a
              href="https://www.github.com/lyamss/AmourConnect"
              className="transition duration-300 hover:text-gray-300"
            >
              Code source du projet
            </a>
          </div>
        </div>
      </div>
    </div>
    </Fade>
  );
}

export default Footer