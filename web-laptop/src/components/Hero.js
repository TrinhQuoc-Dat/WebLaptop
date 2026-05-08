import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <img
        src={`${process.env.PUBLIC_URL}/banner.jpg`}
        alt="Banner"
        className="hero-banner-img"
      />
    </section>
  );
};

export default Hero;
