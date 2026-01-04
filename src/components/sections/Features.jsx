import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Database, Lock, Activity, X } from 'lucide-react';
import ScrambleHover from '../ui/ScrambleHover';
import MailWise from "/MailWise.png";
import ER from "/public/ER.png";
import CD from "/public/image.png";

const Features = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const openModal = (imageSrc) => {
        if (imageSrc) {
            setSelectedImage(imageSrc);
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <section className="pt-12 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Modal Portal */}
            {mounted && selectedImage && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 animate-in fade-in duration-300 !cursor-default"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 p-3 bg-zinc-800/50 hover:bg-zinc-700/80 rounded-full text-white transition-colors z-[10000] border border-white/10 !cursor-pointer"
                    >
                        <X size={28} />
                    </button>

                    <div
                        className="relative w-full h-full flex items-center justify-center pointer-events-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Full View"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] pointer-events-auto"
                        />
                    </div>
                </div>,
                document.body
            )}

            <div className="mb-24 reveal-up">
                <h2 className="text-5xl md:text-7xl font-bold mb-6">
                    <ScrambleHover text="Intelligence," autoComplete={true} /> <br />
                    <span className="serif italic text-zinc-500">Unleashed locally.</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[900px]">
                {/* Main Card */}
                <div
                    // Added !cursor-zoom-in to FORCE the system cursor to show
                    className="col-span-1 md:col-span-2 md:row-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group reveal-up !cursor-zoom-in"
                    onClick={() => openModal(MailWise)}
                >
                    <div className="absolute inset-0 z-0">
                        <img
                            src={MailWise}
                            alt="Chip"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"><Database className="text-white" /></div>
                            <div className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                                Vector Store
                            </div>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-4 drop-shadow-xl text-white">OVR Workflow</h3>
                            <p className="text-zinc-300 font-medium drop-shadow-md">Incoming emails are fetched by Node.js and queued in RabbitMQ, where a worker triggers Ollama for local AI summarization and Weaviate for vector indexing. The enriched data is then saved to PostgreSQL and served to the React frontend, enabling instant semantic search and smart, context-aware responses.</p>
                        </div>
                    </div>
                </div>

                {/* Secondary Card 1 */}
                <div
                    // Added !cursor-zoom-in
                    className="col-span-1 md:col-span-1 glass-panel rounded-3xl p-8 relative overflow-hidden group reveal-up delay-100 !cursor-zoom-in"
                    onClick={() => openModal(ER)}
                >
                    <div className="absolute inset-0 z-0">
                        <img
                            src={ER}
                            alt="Privacy"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                        <div className="p-2 w-fit bg-white/10 backdrop-blur-md rounded-full border border-white/20"><Lock className="text-white" size={20} /></div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-white">DataBase</h3>
                            <p className="text-sm font-semibold text-zinc-300">PostgreSQL stores metadata and state, while Weaviate handles vector embeddings for AI context. RabbitMQ orchestrates the sync: workers generate vectors for Weaviate and commit the results back to PostgreSQL.</p>
                        </div>
                    </div>
                </div>

                {/* Secondary Card 2 */}
                <div
                    // Added !cursor-default (forces normal arrow since it's not clickable)
                    className="col-span-1 md:col-span-1 glass-panel rounded-3xl p-8 relative overflow-hidden group reveal-up delay-200 !cursor-zoom-in"
                    onClick={() => openModal(CD)}
                >
                    <div className="absolute inset-0 z-0">
                        <img
                            src={CD}
                            alt="Connect"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                        <div className="p-2 w-fit bg-white/10 backdrop-blur-md rounded-full border border-white/20"><Activity className="text-white" size={20} /></div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-white">Class Diagram</h3>
                            <p className="text-sm font-semibold text-zinc-300">High-throughput ingestion - Processing - Embedding - RAG</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;