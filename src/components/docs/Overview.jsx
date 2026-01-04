import React from 'react';
import { Activity, Layout, Cpu, Server } from 'lucide-react';

export const Overview = () => {
    return (
        <div className="space-y-12">

            {/* SECTION: SYSTEM OVERVIEW */}
            <section id="overview">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Activity className="text-[var(--text-primary)]" /> System Overview
                </h2>
                <p className="text-xl leading-relaxed text-[var(--text-secondary)] mb-8 font-light">
                    Mailwise is an AI-native email SaaS backend designed to ingest, process, and analyze email streams using local Large Language Models (LLMs). It prioritizes data sovereignty by running inference locally via Ollama.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* High Contrast Card 1 */}
                    <div className="p-6 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] hover:border-[var(--text-primary)] transition-colors duration-300">
                        <h4 className="font-bold font-mono text-lg flex items-center gap-3 mb-3 text-[var(--text-primary)]">
                            <Cpu size={18} /> AI-Native
                        </h4>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Built from the ground up with RAG (Retrieval Augmented Generation) and Vector Search as core primitives, not afterthoughts.
                        </p>
                    </div>

                    {/* High Contrast Card 2 */}
                    <div className="p-6 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] hover:border-[var(--text-primary)] transition-colors duration-300">
                        <h4 className="font-bold font-mono text-lg flex items-center gap-3 mb-3 text-[var(--text-primary)]">
                            <Layout size={18} /> Event-Driven
                        </h4>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Uses RabbitMQ to decouple high-speed ingestion (IMAP Sync) from heavy compute tasks (Vectorization).
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION: ARCHITECTURE */}
            <section id="architecture">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <Server className="text-[var(--text-primary)]" /> System Architecture
                </h2>
                <p className="text-[var(--text-secondary)] mb-8">
                    The backend is composed of three distinct microservices that share a common data layer.
                </p>

                <div className="space-y-4">
                    {/* API Service Card - Monochrome */}
                    <div className="flex flex-col sm:flex-row gap-6 p-6 border border-[var(--border-color)] rounded-xl hover:border-[var(--text-primary)] transition-all bg-[var(--bg-primary)]">
                        <div className="w-12 h-12 rounded bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center flex-shrink-0 font-bold font-mono">
                            API
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">API Service</h3>
                            <p className="text-[var(--text-secondary)] text-sm mb-3">
                                The gateway for the frontend. Handles User Auth, IMAP Sync triggering, and serves AI answers.
                            </p>
                            <div className="text-xs font-mono text-[var(--text-secondary)] opacity-60"></div>
                        </div>
                    </div>

                    {/* Processing Service Card - Monochrome */}
                    <div className="flex flex-col sm:flex-row gap-6 p-6 border border-[var(--border-color)] rounded-xl hover:border-[var(--text-primary)] transition-all bg-[var(--bg-primary)]">
                        <div className="w-12 h-12 rounded border border-[var(--text-primary)] text-[var(--text-primary)] flex items-center justify-center flex-shrink-0 font-bold font-mono">
                            PROC
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">Processing Service</h3>
                            <p className="text-[var(--text-secondary)] text-sm mb-3">
                                High-throughput consumer. Ingests raw email JSON, de-duplicates against Postgres, and writes data immediately.
                            </p>
                            <div className="text-xs font-mono text-[var(--text-secondary)] opacity-60"></div>
                        </div>
                    </div>

                    {/* Embedding Service Card - Monochrome */}
                    <div className="flex flex-col sm:flex-row gap-6 p-6 border border-dashed border-[var(--text-secondary)] rounded-xl hover:border-[var(--text-primary)] transition-all bg-[var(--bg-primary)]">
                        <div className="w-12 h-12 rounded bg-[var(--bg-secondary)] text-[var(--text-primary)] flex items-center justify-center flex-shrink-0 font-bold font-mono">
                            EMB
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">Embedding Service</h3>
                            <p className="text-[var(--text-secondary)] text-sm mb-3">
                                Background worker. Chunks text using LangChain and generates vectors via Ollama + Weaviate.
                            </p>
                            <div className="text-xs font-mono text-[var(--text-secondary)] opacity-60"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};