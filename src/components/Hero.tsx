"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import { usePathname } from 'next/navigation'

type ImageObject = {
  width: number;
  height: number;
  url: string;
};

type ButtonObject = {
  text: string;
  href: string;
};

type HeroProps = {
  images: ImageObject[];
  interval?: number;
  button?: ButtonObject;
};

const Hero: React.FC<HeroProps> = ({ images, button, interval = 3000 }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const totalImages = images.length;
  const pathname = usePathname()

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (isReversed) {
        if (currentImage === 0) {
          setIsReversed(false);
          setCurrentImage(currentImage + 1);
        } else {
          setCurrentImage(currentImage - 1);
        }
      } else {
        if (currentImage === totalImages - 1) {
          setIsReversed(true);
          setCurrentImage(currentImage - 1);
        } else {
          setCurrentImage(currentImage + 1);
        }
      }
    }, interval);

    return () => clearInterval(slideInterval);
  }, [currentImage, totalImages, interval, isReversed]);

  // return null if not on homepage
  if (pathname !== '/') return null

  /**
   * By default all images are invisible, then they will fade in on top of each other
   * once the slider reaches the last item it will reverse the order and fade out
   * revealing the previous image.
   * I did this because I wanted the illusion that only certain parts of the image changes
   */
  return (
    <div className={`flex justify-center items-center bg-black w-full relative border-t border-b border-[#0E142D]`}>
      <div className="relative" style={{width: `${images[0].width}px`, height: `${images[0].height}px`}}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImage || currentImage >= index
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              zIndex: index+1,
            }}
          >
            <Image
              src={image.url}
              alt={`Slide ${index + 1}`} // z-index cant be 0
              width={image.width}
              height={image.height}
              quality={100}
            />
          </div>
        ))}
        {button && (
          <div className="z-50 absolute bottom-12 left-0 w-full flex justify-center">
            <div>
              <Button href={button?.href} className="uppercase">
                {button?.text}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;