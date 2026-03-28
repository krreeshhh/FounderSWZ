"use client";

import React from "react";
import Image from 'next/image'
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { motion } from "motion/react";
import { AnimationWrapper, childVariant } from "@/components/ui/animation-wrapper";

export default function HallOfFame() {
  return (
    <section className="bg-background overflow-hidden">
      <AnimationWrapper>
        {/* Heading matching Skills section style */}
        <motion.div variants={childVariant} className="mx-auto w-full max-w-7xl text-left my-2">
          <motion.h2 variants={childVariant} className='text-3xl font-bold'>Colleges Trusted by</motion.h2>
        </motion.div>
        {/* Full-bleed wrapper to span the entire viewport width even inside centered layouts */}
        <motion.div variants={childVariant} className="relative mx-[calc(50%-50vw)] w-screen px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="relative w-full py-2">
              <InfiniteSlider speed={25} gap={20}>
                {[
                  { src: "/colleges/Amit.png", alt: "Amit Logo" },
                  { src: "/colleges/Peri.png", alt: "Peri Logo" },
                  { src: "/colleges/Prince.png", alt: "Prince Logo" },
                  {
                    src: "/colleges/Sathak.png",
                    darkSrc: "/colleges/Sathak-dark.png",
                    alt: "Sathak Logo"
                  },
                  { src: "/colleges/SSM.jpg", alt: "SSM Logo" },
                ].map((logo, idx) => (
                  <div key={idx} className="flex-none px-2">
                    {logo.darkSrc ? (
                      <>
                        <Image
                          className="h-14 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 transform-gpu will-change-transform dark:hidden"
                          src={logo.src}
                          alt={logo.alt}
                          height={80}
                          width={200}
                        />
                        <Image
                          className="h-14 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 transform-gpu will-change-transform hidden dark:block"
                          src={logo.darkSrc}
                          alt={logo.alt}
                          height={80}
                          width={200}
                        />
                      </>
                    ) : (
                      <Image
                        className="h-14 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 transform-gpu will-change-transform"
                        src={logo.src}
                        alt={logo.alt}
                        height={80}
                        width={200}
                      />
                    )}
                  </div>
                ))}
                {/* duplicate set to ensure seamless tiling */}
                {[
                  { src: "/colleges/Amit.png", alt: "Amit Logo" },
                  { src: "/colleges/Peri.png", alt: "Peri Logo" },
                  { src: "/colleges/Prince.png", alt: "Prince Logo" },
                  {
                    src: "/colleges/Sathak.png",
                    darkSrc: "/colleges/Sathak-dark.png",
                    alt: "Sathak Logo"
                  },
                  { src: "/colleges/SSM.jpg", alt: "SSM Logo" },
                ].map((logo, idx) => (
                  <div key={`dup-${idx}`} className="flex-none px-2">
                    {logo.darkSrc ? (
                      <>
                        <Image
                          className="h-14 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 transform-gpu will-change-transform dark:hidden"
                          src={logo.src}
                          alt={logo.alt}
                          height={80}
                          width={200}
                        />
                        <Image
                          className="h-14 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 transform-gpu will-change-transform hidden dark:block"
                          src={logo.darkSrc}
                          alt={logo.alt}
                          height={80}
                          width={200}
                        />
                      </>
                    ) : (
                      <Image
                        className="h-14 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 transform-gpu will-change-transform"
                        src={logo.src}
                        alt={logo.alt}
                        height={80}
                        width={200}
                      />
                    )}
                  </div>
                ))}
              </InfiniteSlider>

              <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
              <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
              <ProgressiveBlur className="absolute left-0 top-0 h-full w-20" direction="left" blurIntensity={1} />
              <ProgressiveBlur className="absolute right-0 top-0 h-full w-20" direction="right" blurIntensity={1} />
            </div>
          </div>
        </motion.div>
      </AnimationWrapper>
    </section>
  );
}


