'use client';
import productImage from'@/assets/product-image.png';
import pyramidImage from'@/assets/pyramid.png';
import tubeImage from '@/assets/tube.png';
import Image from 'next/image';
import { motion, useScroll , useTransform} from 'framer-motion';
import { useRef } from 'react';

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const{scrollYProgress} = useScroll({
    target:  sectionRef,
    offset: ['start end','end start' ]
  });
  const translateY = useTransform(scrollYProgress,[0,1],[150,-150]);
  return (
  <section ref={sectionRef} className="bg-gradient-to-b from-[#FFFFFF] to-[#a0e2a6] py-24 overflow-x-clip">
    <div className="container">
      <div className='section-heading'> 
      <div className='flex justify-center'>
       <div className='tag'> Boost your productivity</div>
      </div>
      <h2 className='section-title mt-5'>
        A more effective way to track crops
      </h2>
      <p className='section-description mt-5'>Effortlessly turn your farming insights into action with AI-powered crop recommendations, 
        plant disease and pest detection, and precise weather forecasts
      </p>
      </div>
      <div className='relative'>
       <motion.img src={productImage.src} alt='Product Image'  className='mt-10' />
       <motion.img src={pyramidImage.src} alt='Pyramid Image' height={62} width={162} className='hidden md:block absolute -right-36 -top-32' 
       style={{
        translateY,
       }}
       />
       <motion.img src={tubeImage.src} alt='Tube Image' height={248} width={248} className='hidden md:block absolute bottom-24 -left-36' 
       style={{
        translateY,
       }}
       />
      </div>
    </div>
  </section>
  );
};
