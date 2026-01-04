import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

export const CodeBlock = ({ filename, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-8 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[#0e0e11] shadow-2xl group transition-all duration-300 hover:shadow-indigo-500/10 hover:border-indigo-500/20">
            {/* Header / Tab Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-white/5">
                <div className="flex items-center gap-4">
                    {/* Window Controls */}
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>

                    {/* Filename */}
                    {filename ? (
                        <span className="text-xs font-mono text-gray-400 flex items-center gap-2 ml-2">
                            <span className="opacity-50">/</span> {filename}
                        </span>
                    ) : (
                        <span className="text-xs font-mono text-gray-500 flex items-center gap-2 ml-2">
                            <Terminal size={12} /> Console
                        </span>
                    )}
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400 hover:text-white transition-all"
                >
                    {copied ? (
                        <> <Check size={12} className="text-green-400" /> <span className="text-green-400">Copied</span> </>
                    ) : (
                        <> <Copy size={12} /> <span>Copy</span> </>
                    )}
                </button>
            </div>

            {/* Code Area */}
            <div className="p-6 overflow-x-auto bg-[#0e0e11]">
                <pre className="font-mono text-sm leading-relaxed text-gray-300 tab-4">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};