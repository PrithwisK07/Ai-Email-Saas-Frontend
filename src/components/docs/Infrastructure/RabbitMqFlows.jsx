import React from 'react';
import { CodeBlock } from '../../ui/CodeBlock';
import { GitPullRequest, ArrowRight } from 'lucide-react';

export const RabbitMqFlows = () => {
    return (
        <div className="space-y-12">
            <section id="rabbitmq-flows">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <GitPullRequest className="text-[var(--text-primary)]" /> RabbitMQ Data Flows
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                    Mailwise uses an event-driven architecture to handle the high volume of incoming emails without blocking the user interface. We utilize two primary durable queues.
                </p>

                {/* FLOW DIAGRAM - MONOCHROME */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg mb-8">
                    <div className="text-center">
                        <div className="font-bold text-gray-800">API Service</div>
                        <div className="text-xs text-gray-500">(Producer)</div>
                    </div>
                    <ArrowRight className="text-gray-400" />
                    <div className="bg-orange-100 px-4 py-2 rounded border border-orange-200 text-center">
                        <div className="font-mono text-sm font-bold text-orange-800">email_processing_queue</div>
                        <div className="text-xs text-orange-600">Raw JSON Data</div>
                    </div>
                    <ArrowRight className="text-gray-400" />
                    <div className="text-center">
                        <div className="font-bold text-gray-800">Processing Svc</div>
                        <div className="text-xs text-gray-500">(Consumer / Producer)</div>
                    </div>
                    <ArrowRight className="text-gray-400" />
                    <div className="bg-purple-100 px-4 py-2 rounded border border-purple-200 text-center">
                        <div className="font-mono text-sm font-bold text-purple-800">embedding_required_queue</div>
                        <div className="text-xs text-purple-600">Cleaned Text</div>
                    </div>
                    <ArrowRight className="text-gray-400" />
                    <div className="text-center">
                        <div className="font-bold text-gray-800">Embedding Svc</div>
                        <div className="text-xs text-gray-500">(Consumer)</div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">Queue Definitions</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-[var(--border-color)] rounded-lg">
                        <h4 className="font-bold font-mono text-[var(--text-primary)] mb-2">email_processing_queue</h4>
                        <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                            <strong>Consumer:</strong> Processing Service<br />
                            <strong>Strategy:</strong> High-throughput (Prefetch 10)<br />
                            <strong>Action:</strong> Deduplication & SQL Insert
                        </p>
                        <div className="text-xs font-mono text-[var(--text-secondary)] opacity-70"></div>
                    </div>

                    <div className="p-4 border border-[var(--border-color)] rounded-lg">
                        <h4 className="font-bold font-mono text-[var(--text-primary)] mb-2">embedding_required_queue</h4>
                        <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                            <strong>Consumer:</strong> Embedding Service<br />
                            <strong>Strategy:</strong> Rate-limited (Prefetch 1)<br />
                            <strong>Action:</strong> LangChain Chunking & Vectorization
                        </p>
                        <div className="text-xs font-mono text-[var(--text-secondary)] opacity-70"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};