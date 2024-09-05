'use client';
import ArrowIcon from '@/assets/arrow-right.svg';
import cogImage from '@/assets/cog.png';
import Image from 'next/image';
import {motion, useScroll} from 'framer-motion';
import { useRef } from 'react';

export const Hero = () => {
  const heroRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target:heroRef,
    offset:['start end','end start'],
  });

  return (
    <section ref={heroRef} className='pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#84a847ee,#EAEEFE_100%)] overflow-x-clip'>
      <div className="container">
        <div className='md:flex items-center'> 
          <div className='md:w-[478px]'>
            <div className="tag">Version 1.0 is here</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#84a847ee] text-transparent bg-clip-text mt-6">
               Welcome to CropIntel AI
            </h1>
            <p className="text-xl text-[#182207ee] tracking-tight mt-6">
             We use artificial intelligence to give farmers real-time advice on crops, pests, and weather.
            Our platform helps make smart farming decisions with easy-to-use mobile and web app
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <a href="https://hackathon-cropintel.vercel.app/" className="btn btn-primary">
                Get for free
              </a>
              <a href="https://hackathon-cropintel.vercel.app/" className="btn btn-text gap-1">
                <span>Learn more</span>
                <ArrowIcon className="h-5 w-5"/>
              </a>
            </div>
          </div>
          <div className='mt-20 md:mt-0 md:h-[648px] md:flex-1f relative'>
            <motion.img 
              src={cogImage.src} 
              alt="Cog image"
              className='md:absolute md:h-full md:w-auto md:max-w-none md:-left-6'
              animate={{
                translateY:[-30,30],
              }}
              transition={{
                repeat:Infinity,
                repeatType:'mirror',
                duration:3,
                ease:"easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </section> 
  );
};
