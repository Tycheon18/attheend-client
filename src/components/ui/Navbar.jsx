import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Menu, X } from 'lucide-react';

const Navbar = ({
  logo = 'Logo',
  links = [],
  sticky = true,
  transparent = false,
  rightContent = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const hoverTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    if (sticky || transparent) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sticky, transparent]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleMouseEnter = (index) => {
    clearTimeout(hoverTimerRef.current);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => setHoveredIndex(null), 120);
  };

  const hasHoverCard = (link) => link.icon && link.description;

  return (
    <nav
      style={{
        backgroundColor: transparent && !isScrolled ? 'transparent' : 'var(--color-bg)',
        borderBottom: `1px solid ${transparent && !isScrolled ? 'transparent' : 'var(--color-border)'}`,
        boxShadow: isScrolled ? '0 1px 8px var(--color-shadow)' : 'none',
        transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
      className={`w-full z-50 ${sticky ? 'sticky top-0' : 'relative'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex-shrink-0">
            {typeof logo === 'string' ? (
              <a
                href="/"
                className="text-xl font-bold transition-colors duration-200 text-charcoal-900"
              >
                {logo}
              </a>
            ) : (
              logo
            )}
          </div>

          <div className="hidden md:flex md:items-center md:gap-1">
            {links.map((link, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={link.href}
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-charcoal-700 transition-all duration-200 hover:text-ink-500 group"
                >
                  <span
                    className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: 'var(--color-surface)' }}
                  />
                  {link.icon && (
                    <link.icon className="relative w-3.5 h-3.5 flex-shrink-0 text-charcoal-500 group-hover:text-ink-500 transition-colors duration-200" />
                  )}
                  <span className="relative">{link.label}</span>
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-ink-500 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-200 origin-left" />
                </a>

                {hasHoverCard(link) && hoveredIndex === index && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 z-50"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mx-auto w-3 h-1.5 overflow-hidden mb-0.5" style={{ position: 'relative' }}>
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '1px' }}
                      />
                    </div>
                    <div
                      className="rounded-xl px-4 py-3 shadow-lg animate-fade-in"
                      style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 8px 24px var(--color-shadow)' }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-surface2)' }}>
                          <link.icon className="w-3.5 h-3.5 text-charcoal-700" />
                        </div>
                        <span className="text-sm font-semibold text-charcoal-900">{link.label}</span>
                      </div>
                      <p className="text-xs text-charcoal-500 leading-relaxed">{link.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {rightContent && (
            <div className="hidden md:flex items-center gap-4">{rightContent}</div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md transition-colors duration-200 text-charcoal-700"
            aria-label="메뉴 열기/닫기"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal-700 transition-colors duration-200 hover:text-ink-500"
            >
              {link.icon && <link.icon className="w-4 h-4 text-charcoal-500 flex-shrink-0" />}
              {link.label}
              {link.description && (
                <span className="ml-auto text-xs text-charcoal-500 truncate max-w-[120px]">{link.description}</span>
              )}
            </a>
          ))}
          {rightContent && (
            <div className="pt-2 mt-2 flex items-center px-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    description: PropTypes.string,
  })),
  sticky: PropTypes.bool,
  transparent: PropTypes.bool,
  rightContent: PropTypes.node,
};

export default Navbar;
