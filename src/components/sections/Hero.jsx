import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Magnetic from '../ui/Magnetic';
import ScrambleHover from '../ui/ScrambleHover';

const Hero = ({ onHoverStart, onHoverEnd }) => {
    const [requestButtonHover, setRequestButtonHover] = useState(false);

    return (
        <header className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 pb-32 overflow-hidden bg-black isolate">

            {/* --- BACKGROUND EFFECTS --- */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]" />

            {/* VERTICAL WHITE STRIPE */}
            <div className="absolute top-0 left-0 md:w-[50vw] h-full bg-white pointer-events-none hidden md:block" />

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-7xl w-full mx-auto relative">
                <div className="mb-12">
                    <h1 className="text-[13vw] lg:text-[10vw] leading-[0.85] font-bold tracking-tighter">
                        <span className="block text-white mix-blend-difference">INTELLIGENCE</span>
                    </h1>
                    <h1 className="text-[13vw] lg:text-[9vw] leading-[0.85] font-bold tracking-tighter flex flex-wrap items-center gap-4">
                        <span className="serif italic font-light text-white mix-blend-difference">Privacy &</span>
                        <span className="text-white mix-blend-difference">MAILWISE</span>
                    </h1>
                </div>

                <div className="flex flex-col items-start gap-10 max-w-xl pl-2">
                    <p className="text-zinc-400 text-lg leading-relaxed mix-blend-difference">
                        Powered by <span className="text-white italic font-semibold">Qwen 2.5</span> and{" "}
                        <span className="text-white italic font-semibold">Weaviate</span>. Chat with your inbox.
                        <br className="hidden md:block" />
                        Zero data leaks. Zero API costs.
                    </p>

                    <Magnetic strength={50}>
                        <button
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-medium tracking-tighter text-black mix-blend-difference border border-zinc-700 rounded-full transition-all hover:bg-black hover:text-white hover:scale-105"
                            onMouseEnter={() => {
                                onHoverStart();
                                setRequestButtonHover(true);
                            }}
                            onMouseLeave={() => {
                                onHoverEnd();
                                setRequestButtonHover(false);
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                window.open('http://localhost:3000/dashboard/', '_blank');
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <ScrambleHover
                                    text="Get Started"
                                    useHover={false}
                                    active={requestButtonHover}
                                />
                                <ArrowRight size={16} />
                            </span>
                        </button>
                    </Magnetic>
                </div>
            </div>

        </header>
    );
};

export default Hero;