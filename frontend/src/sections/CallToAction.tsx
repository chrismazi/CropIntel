import ArrowRight from '@/assets/arrow-right.svg';

export const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#b9ca89] py-24">
      <div className="container">
        <div className='section-heading'>
          <h2 className="section-title">Sign Up for Free Today</h2>
          <p className="section-description mt-5">
            Celebrate the joy of accomplishment with an app designed to track your crops and motivate your efforts.
          </p>
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <a href="https://hackathon-cropintel.vercel.app/" className="btn btn-primary">
            Get for free
          </a>
          <a href="https://hackathon-cropintel.vercel.app/" className="btn btn-text gap-1">
            <span>Learn more</span>
            <ArrowRight className="h-5 w-5"/>
          </a>
        </div>
      </div>
    </section>
  );
};
