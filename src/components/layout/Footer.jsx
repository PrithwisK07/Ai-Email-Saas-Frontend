import React from 'react';
import { ArrowUpRight, Send, Github } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Tech Stack Documentation Links
    const techStack = [
        { name: 'React 19', url: 'https://react.dev' },
        { name: 'Express.js', url: 'https://expressjs.com' },
        { name: 'RabbitMQ', url: 'https://www.rabbitmq.com' },
        { name: 'Weaviate', url: 'https://weaviate.io/developers/weaviate' },
        { name: 'Ollama', url: 'https://github.com/ollama/ollama' }
    ];

    // Main Navigation Links (Same as Menu)
    const menuLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Stack', href: '#stack' },
        { name: 'Deep Dive', href: '#security' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <footer className="h-screen bg-black text-[#e1e1e1] border-t border-zinc-900 relative overflow-hidden flex flex-col justify-between">

            {/* --- TOP SECTION: CTA & NEWSLETTER --- */}
            <div className="flex-1 flex items-center">
                <div className="max-w-7xl w-full mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 md:gap-12">

                        <div className="max-w-xl">
                            <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                                Ready to go <span className="text-zinc-500 font-serif italic">offline?</span>
                            </h3>
                            <p className="text-zinc-400 leading-relaxed mb-6">
                                Join the waiting list for MailWise Enterprise. One email a month. No spam.
                            </p>

                            <form className="relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="email@company.com"
                                    className="w-full bg-transparent border-b border-zinc-700 py-3 text-lg focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>

                        <div className="flex flex-col items-end">
                            <button
                                className="px-8 py-4 border border-zinc-800 rounded-full text-sm font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open('http://localhost:3000/dashboard/', '_blank');
                                }}
                            >
                                Start Trial
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MIDDLE SECTION: LINKS GRID --- */}
            <div className="border-t border-zinc-900 bg-black/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                        {/* Column 1: Tech Stack Docs */}
                        <div className="flex flex-col gap-3">
                            <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">Architecture</h4>
                            {techStack.map((tech) => (
                                <a
                                    key={tech.name}
                                    href={tech.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 hover:text-white transition-colors w-fit group"
                                >
                                    <span className="flex items-center gap-2">
                                        {tech.name}
                                        <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* Column 2: Navigation (Menu) */}
                        <div className="flex flex-col gap-3">
                            <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">Menu</h4>
                            {menuLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-zinc-400 hover:text-white transition-colors w-fit"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Column 3: Spacer (Previously Legal) */}
                        <div className="hidden md:block">
                            {/* Empty column for spacing/balance since Legal was removed */}
                        </div>

                        {/* Column 4: Connect (GitHub Only) */}
                        <div className="flex flex-col gap-3">
                            <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">Source</h4>
                            <a
                                href="https://github.com/PrithwisK07/Ai-Email-Saas-"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit group"
                            >
                                <Github size={18} />
                                <span className="underline decoration-zinc-700 underline-offset-4 group-hover:decoration-white transition-all">
                                    GitHub Repository
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- BOTTOM BAR --- */}
            <div className="border-t border-zinc-900 bg-[#020202] flex flex-col justify-end">
                <div className="max-w-7xl w-full mx-auto px-6 md:px-12 pt-4 pb-20 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-mono uppercase tracking-widest gap-2 md:gap-0">
                    <p>Designed in Bangalore</p>
                    <p>© {currentYear} MailWise Labs Inc.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;