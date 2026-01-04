import React, { useState, useEffect, useRef } from 'react';

// Styles
import './styles/zenith.css';

// Layout & Sections
import Navbar from './components/layout/Navbar';
import MenuOverlay from './components/layout/MenuOverlay';
import Footer from './components/layout/Footer';
import MailwiseDocs from './MailwiseDocs'

import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import AccordionStack from './components/sections/AccordionStack';
import TechSpecs from './components/sections/TechSpecs';
import CityGallery from './components/sections/CityGallery';

const ZenithLanding = () => {
    // --- State ---
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- Refs ---
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    // --- Preloader Logic ---
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    // --- Cursor Logic (Lerp) ---
    useEffect(() => {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            const ease = 0.4;
            const followerEase = 0.2;

            cursorX += (mouseX - cursorX) * ease;
            cursorY += (mouseY - cursorY) * ease;

            followerX += (mouseX - followerX) * followerEase;
            followerY += (mouseY - followerY) * followerEase;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            }
            if (followerRef.current) {
                followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            }
            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove);
        const rafId = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // --- Cursor Hover Helpers ---
    const onHoverStart = () => {
        if (cursorRef.current) cursorRef.current.classList.add('hovered');
        if (followerRef.current) followerRef.current.classList.add('hovered');
    };
    const onHoverEnd = () => {
        if (cursorRef.current) cursorRef.current.classList.remove('hovered');
        if (followerRef.current) followerRef.current.classList.remove('hovered');
    };

    // --- Scroll Observer ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('in-view');
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal-text, .reveal-up').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [isLoading]);

    return (
        <div className="bg-[#050505] text-[#e1e1e1] font-sans min-h-screen cursor-none overflow-x-hidden selection:bg-zinc-700 selection:text-white">

            {/* --- PRELOADER --- */}
            <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.87,0,0.13,1)] ${isLoading ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="text-center">
                    <div className="overflow-hidden h-12 mb-2">
                        <h1 className={`text-4xl font-bold tracking-tighter transition-transform duration-700 delay-300 ${isLoading ? 'translate-y-0' : '-translate-y-full'}`}>
                            MAILWISE
                        </h1>
                    </div>
                    <div className="w-64 h-[1px] bg-zinc-800 relative overflow-hidden">
                        <div className={`absolute inset-0 bg-white transition-transform duration-[2s] ease-in-out origin-left ${isLoading ? 'scale-x-100' : 'scale-x-100 translate-x-full'}`}></div>
                    </div>
                    <p className="mt-4 font-mono text-xs text-zinc-500 animate-pulse">INITIALIZING SECURE ENVIRONMENT</p>
                </div>
            </div>

            {/* --- CURSOR --- */}
            <div ref={cursorRef} className="cursor-dot" />
            <div ref={followerRef} className="cursor-circle" />

            {/* --- NOISE OVERLAY --- */}
            <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* --- NAV --- */}
            <Navbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
            />

            {/* --- HERO SECTION --- */}
            <Hero onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />

            <main className="relative z-20 bg-[#050505]">
                {/* --- FEATURES SECTION --- */}
                <section id="features">
                    <Features onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
                </section>

                {/* --- STACK SECTION --- */}
                <section id="stack" className="py-24 relative bg-[#080808]">
                    <AccordionStack />
                </section>

                {/* <CityGallery /> */}

                {/* --- SECURITY (TECH SPECS) SECTION --- */}
                <section id="security">
                    <TechSpecs onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
                </section>

                <MailwiseDocs />

                {/* --- CONTACT (FOOTER) SECTION --- */}
                <section id="contact">
                    <Footer onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
                </section>
            </main>

            {/* --- MENU OVERLAY --- */}
            <MenuOverlay
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
            />
        </div>
    );
};

export default ZenithLanding;