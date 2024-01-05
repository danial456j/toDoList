import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'url_to_image_1',
      text: 'Welcome to Slide 1',
      buttonText: 'Sign Up Now',
    },
    {
      image: 'url_to_image_2',
      text: 'Explore Slide 2',
      buttonText: 'Learn More',
    },
    {
      image: 'url_to_image_3',
      text: 'Discover Slide 3',
      buttonText: 'Get Started',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5000 milliseconds (5 seconds)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [slides.length]);

  return (
    <div className="slider">
      <img src={slides[currentSlide].image} alt={`Slide ${currentSlide + 1}`} />
      <div className="text-container">
        <p>{slides[currentSlide].text}</p>
        <button>{slides[currentSlide].buttonText}</button>
      </div>
    </div>
  );
};

export default Slider;
