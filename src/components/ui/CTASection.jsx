import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';

const CTASection = ({
  title, subtitle, primaryButton, secondaryButton,
  backgroundType = 'gradient', backgroundImage,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); }); },
      { threshold: 0.2, rootMargin: '50px' }
    );
    observer.observe(el);
    return () => { observer.unobserve(el); };
  }, []);

  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case 'gradient': return 'bg-gradient-to-r from-blue-600 to-purple-600';
      case 'solid': return 'bg-blue-600';
      case 'image': return backgroundImage ? 'bg-cover bg-center' : 'bg-gradient-to-r from-blue-600 to-purple-600';
      default: return 'bg-gradient-to-r from-blue-600 to-purple-600';
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 sm:py-20 px-4 ${getBackgroundStyle()}`}
      style={backgroundType === 'image' && backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {backgroundType === 'image' && backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {subtitle}
          </p>
        )}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {primaryButton && (
            <a href={primaryButton.href} className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg">
              {primaryButton.text}
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
          {secondaryButton && (
            <a href={secondaryButton.href} className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95">
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

CTASection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  primaryButton: PropTypes.shape({ text: PropTypes.string.isRequired, href: PropTypes.string.isRequired }),
  secondaryButton: PropTypes.shape({ text: PropTypes.string.isRequired, href: PropTypes.string.isRequired }),
  backgroundType: PropTypes.oneOf(['gradient', 'solid', 'image']),
  backgroundImage: PropTypes.string,
};

export default CTASection;
