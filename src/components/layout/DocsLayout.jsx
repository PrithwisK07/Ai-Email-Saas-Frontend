import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, Search, Github, Moon, Sun, Rocket, Server,
    Database, ChevronRight, X, Command, Diamond
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Monochrome Design Tokens ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f4f4f5;
    --text-primary: #09090b;
    --text-secondary: #52525b;
    --border-color: #e4e4e7;
    --sidebar-bg: rgba(255, 255, 255, 0.85);
    --code-bg: #18181b;
  }

  .dark-mode {
    --bg-primary: #09090b;
    --bg-secondary: #18181b;
    --text-primary: #fafafa;
    --text-secondary: #a1a1aa;
    --border-color: #27272a;
    --sidebar-bg: rgba(9, 9, 11, 0.85);
    --code-bg: #000000;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  h1, h2, h3, h4, h5 { font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.04em; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-color); }

  .prose h1 { font-size: 3.5rem; line-height: 1; font-weight: 700; margin-bottom: 1.5rem; color: var(--text-primary); }
  .prose h2 { font-size: 1.75rem; margin-top: 4rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); }
  .prose p { font-size: 1.05rem; line-height: 1.75; color: var(--text-secondary); margin-bottom: 1.5rem; }
  
  .animate-enter { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
`;

// --- Navigation Data ---
const NAV_ITEMS = [
    { id: 'overview', label: 'Overview', group: 'Start Here', icon: <Rocket size={14} />, keywords: 'intro system architecture' },
    { id: 'installation', label: 'Installation', group: 'Start Here', icon: <Rocket size={14} />, keywords: 'setup docker env git clone' },

    { id: 'api-service', label: 'API Gateway', group: 'Microservices', icon: <Server size={14} />, keywords: 'endpoints routes auth jwt middleware' },
    { id: 'processing-service', label: 'Processing Engine', group: 'Microservices', icon: <Server size={14} />, keywords: 'ingestion rabbitmq fast path queue' },
    { id: 'embedding-service', label: 'Embedding Worker', group: 'Microservices', icon: <Server size={14} />, keywords: 'rag vector weaviate langchain ollama' },

    { id: 'weaviate-ollama', label: 'Weaviate & Ollama', group: 'Infrastructure', icon: <Database size={14} />, keywords: 'docker compose llm vector database' },
    { id: 'rabbitmq', label: 'RabbitMQ Topology', group: 'Infrastructure', icon: <Database size={14} />, keywords: 'queues messaging event driven' },
];

export const DocsLayout = ({ children, activeSection }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // --- Search State ---
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0); // <--- Track selection
    const searchInputRef = useRef(null);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    // Filter Logic
    const filteredItems = NAV_ITEMS.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
            item.label.toLowerCase().includes(query) ||
            item.group.toLowerCase().includes(query) ||
            item.keywords.includes(query)
        );
    });

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);

    // Keyboard Navigation Handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Open Search (Cmd+K)
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
                return;
            }

            // If search is NOT open, ignore other keys
            if (!isSearchOpen) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                setIsSearchOpen(false);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredItems.length > 0) {
                    const selectedItem = filteredItems[selectedIndex];
                    window.location.hash = selectedItem.id; // Navigate
                    setIsSearchOpen(false); // Close
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, filteredItems, selectedIndex]);

    // Focus input when modal opens
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 50);
        }
    }, [isSearchOpen]);

    const groups = NAV_ITEMS.reduce((acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-gray-500/30 z-50">
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            {/* --- SEARCH MODAL OVERLAY --- */}
            <AnimatePresence>
                {isSearchOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsSearchOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.1 }}
                            className="fixed left-1/2 top-[15%] -translate-x-1/2 w-full max-w-xl bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl shadow-2xl z-[70] overflow-hidden flex flex-col max-h-[60vh]"
                        >
                            <div className="flex items-center px-4 py-4 border-b border-[var(--border-color)]">
                                <Search size={18} className="text-[var(--text-secondary)] mr-3" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm h-6"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[10px] text-[var(--text-secondary)] font-mono">ESC</div>
                            </div>

                            <div className="overflow-y-auto p-2">
                                {filteredItems.length === 0 ? (
                                    <div className="p-8 text-center text-[var(--text-secondary)] text-sm">
                                        No results found for "{searchQuery}"
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {filteredItems.map((item, index) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                onClick={() => setIsSearchOpen(false)}
                                                onMouseEnter={() => setSelectedIndex(index)} // Sync mouse hover with selection
                                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer ${index === selectedIndex
                                                    ? 'bg-[var(--bg-secondary)]'
                                                    : 'hover:bg-[var(--bg-secondary)]'
                                                    }`}
                                            >
                                                <div className={`text-[var(--text-secondary)] ${index === selectedIndex ? 'text-[var(--text-primary)]' : ''}`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-medium ${index === selectedIndex ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                                        {item.label}
                                                    </span>
                                                    <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">{item.group}</span>
                                                </div>
                                                {index === selectedIndex && (
                                                    <ChevronRight size={14} className="ml-auto text-[var(--text-primary)]" />
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="px-4 py-2 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] text-[10px] text-[var(--text-secondary)] flex justify-between">
                                <span>Navigate with <strong className="text-[var(--text-primary)]">↑↓</strong></span>
                                <span>Select with <strong className="text-[var(--text-primary)]">Enter</strong></span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Header */}
            <header className="h-20 border-b border-[var(--border-color)] flex items-center justify-center px-6 bg-[var(--sidebar-bg)] backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-[var(--bg-secondary)] rounded-md">
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hidden md:flex items-center border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 rounded px-3 py-1.5 w-64 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] group"
                    >
                        <Search size={14} className="mr-3 opacity-50" />
                        <span>Search...</span>
                        <div className="ml-auto flex items-center gap-1 opacity-50">
                            <Command size={10} />
                            <span className="text-[10px]">K</span>
                        </div>
                    </button>
                    <div className="w-px h-6 bg-[var(--border-color)] mx-2"></div>
                    <a href="https://github.com/PrithwisK07/Ai-Email-Saas-" target='_blank' className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded transition-all">
                        <Github size={18} />
                    </a>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar */}
                <aside className={`w-72 border-r border-[var(--border-color)] overflow-y-auto bg-[var(--sidebar-bg)] backdrop-blur-md z-30 transition-transform duration-300 fixed inset-0 top-16 lg:static lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <nav className="p-6 pb-20 space-y-10">
                        {Object.entries(groups).map(([groupName, items]) => (
                            <div key={groupName}>
                                <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4 flex items-center gap-2 opacity-80">
                                    {items[0].icon} {groupName}
                                </h5>
                                <ul className="space-y-1 relative">
                                    {items.map((item) => {
                                        const isActive = activeSection === item.id;
                                        return (
                                            <li key={item.id} className="relative">
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-sidebar-bg"
                                                        className="absolute inset-0 bg-[var(--text-primary)] rounded-md"
                                                        initial={false}
                                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                        style={{ zIndex: 0 }}
                                                    />
                                                )}
                                                <a
                                                    href={`#${item.id}`}
                                                    className={`block pl-4 py-2 text-sm relative z-10 transition-colors duration-200 ${isActive
                                                        ? 'text-[var(--bg-primary)] font-medium'
                                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                                        }`}
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto scroll-smooth relative" id="main-scroll">
                    <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-20">
                        {children}
                        <footer className="mt-24 pt-8 border-t border-[var(--border-color)] text-sm text-[var(--text-secondary)] font-mono">
                            &copy; 2026 Mailwise Inc.
                        </footer>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-64 hidden xl:block p-8 border-l border-[var(--border-color)] bg-[var(--sidebar-bg)] backdrop-blur-sm z-20">
                    <div className="fixed w-48">
                        <h5 className="text-xs font-bold font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-6">On this page</h5>
                        <ul className="space-y-0 text-sm border-l border-[var(--border-color)] relative">
                            {NAV_ITEMS.map((item) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <li key={item.id} className="relative">
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-toc-line"
                                                className="absolute left-[-2px] top-0 bottom-0 w-[3px] bg-[var(--text-primary)] rounded-full z-10"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <a
                                            href={`#${item.id}`}
                                            className={`block pl-4 py-1.5 transition-colors duration-200 ${isActive
                                                ? 'text-[var(--text-primary)] font-bold'
                                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};