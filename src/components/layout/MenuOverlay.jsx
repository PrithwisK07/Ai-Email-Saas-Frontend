import React from 'react';
import ScrambleHover from '../ui/ScrambleHover';

const MenuOverlay = ({ isMenuOpen, setIsMenuOpen, onHoverStart, onHoverEnd }) => {

    const menuItems = [
        { label: 'Features', id: 'features' },
        { label: 'Stack', id: 'stack' },
        { label: 'Deep Dive', id: 'security' },
        { label: 'Contact', id: 'contact' }
    ];

    const handleScroll = (e, id) => {
        e.preventDefault();
        setIsMenuOpen(false); // Close menu first

        // Small timeout to allow the menu closing animation to start/finish before scrolling
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    };

    return (
        <div className={`fixed inset-0 bg-[#0a0a0a] z-30 transition-all duration-[0.8s] cubic-bezier(0.87,0,0.13,1) ${isMenuOpen ? 'clip-circle-open' : 'clip-circle-closed'}`} style={{ clipPath: isMenuOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}>
            <div className="h-full flex items-center justify-center">
                <ul className="space-y-6 text-center">
                    {menuItems.map((item) => (
                        <li key={item.label} className="overflow-hidden">
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => handleScroll(e, item.id)}
                                className="block text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 hover:to-white transition-all transform hover:translate-x-4 duration-300"
                                onMouseEnter={onHoverStart}
                                onMouseLeave={onHoverEnd}
                            >
                                <ScrambleHover text={item.label} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MenuOverlay;