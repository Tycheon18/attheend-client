import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const FeatureCard = ({
  number, icon, title, description, chip,
  variant = 'numbered', accentColor = 'ink', href, hrefLabel,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); }); },
      { threshold: 0.1, rootMargin: '50px' }
    );
    observer.observe(el);
    return () => { observer.unobserve(el); };
  }, []);

  const accentMap = {
    ink:   { text: 'text-ink-500',   bg: 'bg-ink-500',   chip: 'bg-ink-50 text-ink-500' },
    spine: { text: 'text-spine-500', bg: 'bg-spine-500', chip: 'bg-amber-50 text-spine-500' },
    cover: { text: 'text-cover-500', bg: 'bg-cover-500', chip: 'bg-red-50 text-cover-500' },
  };
  const accent = accentMap[accentColor] || accentMap.ink;

  return (
    <div
      ref={cardRef}
      className={`relative bg-white border border-linen-300 overflow-hidden transition-all duration-500 cursor-default group ${variant === 'bordered' ? 'rounded-xl' : 'rounded-none'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      {variant === 'bordered' && (
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${accent.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
      )}
      <div className="p-8 flex flex-col flex-1">
        {variant === 'numbered' && number && (
          <div className="font-serif text-5xl font-bold leading-none mb-5 select-none text-linen-200">
            {String(number).padStart(2, '0')}
          </div>
        )}
        {variant === 'icon' && icon && (
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl" style={{ background: 'var(--color-surface2)' }}>
            {icon}
          </div>
        )}
        <h3 className="text-base font-semibold text-charcoal-900 mb-3 leading-snug">
          {icon && variant !== 'icon' && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
        <p className="text-sm text-charcoal-700 leading-relaxed flex-1">{description}</p>
        <div className="mt-5 flex items-center justify-between">
          {chip && (
            <span className={`text-xs px-2.5 py-1 rounded ${accent.chip} font-medium tracking-wide`}>{chip}</span>
          )}
          {href && hrefLabel && (
            <a href={href} className={`text-xs font-medium ${accent.text} flex items-center gap-1 transition-all duration-200 hover:gap-2 ml-auto`}>
              {hrefLabel}
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      </div>
      <div className={`absolute top-0 left-0 bottom-0 w-0.5 ${accent.bg} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top`} />
    </div>
  );
};

FeatureCard.propTypes = {
  number: PropTypes.number,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  chip: PropTypes.string,
  variant: PropTypes.oneOf(['numbered', 'icon', 'bordered']),
  accentColor: PropTypes.oneOf(['ink', 'spine', 'cover']),
  href: PropTypes.string,
  hrefLabel: PropTypes.string,
};

export default FeatureCard;
