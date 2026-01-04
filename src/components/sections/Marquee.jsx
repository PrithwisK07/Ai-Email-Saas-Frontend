import React from 'react';

const Marquee = () => {
    return (
        <div className="py-12 -rotate-2 scale-110 z-20 relative overflow-hidden -mt-24 shadow-2xl">
            <div className="whitespace-nowrap">
                <div className="inline-block animate-marquee">
                    {Array(4).fill(" LOCAL QWEN 2.5 — WEAVIATE VECTOR DB — RABBITMQ — NODE.JS — ").map((text, i) => (
                        <span key={i} className="text-8xl font-black uppercase text-white bg-clip-text bg-gradient-to-b from-zinc-800 to-transparent opacity-50 mr-8">
                            {text}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marquee;