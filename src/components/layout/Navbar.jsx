import React from 'react';
import Magnetic from '../ui/Magnetic';

const Navbar = ({ isMenuOpen, setIsMenuOpen, onHoverStart, onHoverEnd }) => {
    return (
        <nav className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
            <Magnetic>
                <a href="#" className="text-xl font-bold tracking-tighter" onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}>
                    MAILWISE.
                </a>
            </Magnetic>

            <div className="flex items-center gap-6">
                <Magnetic>
                    <button
                        className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest hover:text-zinc-300 transition-colors"
                        onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        System Normal
                    </button>
                </Magnetic>

                <Magnetic>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="group flex flex-col gap-1.5 focus:outline-none mix-blend-difference"
                        onMouseEnter={onHoverStart}
                        onMouseLeave={onHoverEnd}
                    >
                        <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'group-hover:w-5 self-end'}`}></span>
                    </button>
                </Magnetic>
            </div>
        </nav>
    );
};

export default Navbar;