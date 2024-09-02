import productImage from'@/assets/product-image.png';
import pyramidImage from'@/assets/pyramid.png';
import tubeImage from '@/assets/tube.png';
import Image from 'next/image';
export const ProductShowcase = () => {
  return (
  <section className="bg-gradient-to-b from-[#FFFFFF] to-[#a0e2a6] py-24 overflow-x-clip">
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
       <Image src={productImage} alt='Product Image'  className='mt-10' />
       <Image src={pyramidImage} alt='Pyramid Image' height={62} width={162} className='hidden md:block absolute -right-36 -top-32' />
       <Image src={tubeImage} alt='Tube Image' height={248} className='hidden md:block absolute bottom-24 -left-36' />
      </div>
    </div>
  </section>
  );
};
