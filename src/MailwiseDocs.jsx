import React, { useState } from 'react';
import { DocsLayout } from './components/layout/DocsLayout';
import { ArrowRight } from 'lucide-react';

// --- Imports (Same as before) ---
import { Overview } from './components/docs/Overview';
import { Installation } from './components/docs/Installation';
import { ApiOverview } from './components/docs/ApiService/ApiOverview';
import { CoreAuth } from './components/docs/ApiService/CoreAuth';
import { EmailIngestion } from './components/docs/ApiService/EmailIngestion';
import { AiFeatures } from './components/docs/ApiService/AiFeatures';
import { RagWorker } from './components/docs/EmbeddingService/RagWorker';
import { IngestionPipeline } from './components/docs/ProcessingService/IngestionPipeline';
import { SystemOps } from './components/docs/Infrastructure/SystemOps';
import { RabbitMqFlows } from './components/docs/Infrastructure/RabbitMqFlows';

// --- Helper Component for Flow Linking ---
const NextChapter = ({ title, to }) => (
    <a href={`#${to}`} className="group block w-full p-6 mt-8 border border-[var(--border-color)] rounded-xl hover:border-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all">
        <div className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2">Next Chapter</div>
        <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[var(--text-primary)]">{title}</span>
            <ArrowRight className="text-[var(--text-secondary)] group-hover:translate-x-2 transition-transform" />
        </div>
    </a>
);

export default function MailwiseDocs() {
    const [activeSection, setActiveSection] = useState('overview');

    return (
        <DocsLayout activeSection={activeSection}>
            <div className="space-y-20">

                {/* GROUP 1 */}
                <div id="overview-group">
                    <Overview />
                    <NextChapter title="Installation Guide" to="installation" />
                </div>

                <div id="installation">
                    <Installation />
                    <NextChapter title="API Service Architecture" to="api-service" />
                </div>

                {/* GROUP 2 */}
                <div>
                    <h1 id="api-service" className="text-3xl font-extrabold mb-8 pb-4 border-b text-[var(--text-primary)]">API Service</h1>
                    <div className="space-y-16">
                        <div id="api-overview"><ApiOverview /></div>
                        <div id="core-auth"><CoreAuth /></div>
                        <div id="email-ingestion"><EmailIngestion /></div>
                        <div id="ai-features"><AiFeatures /></div>
                    </div>
                    <NextChapter title="Processing Service (Ingestion)" to="processing-service" />
                </div>

                {/* --- PROCESSING SERVICE (Linked to Embedding) --- */}
                <div>
                    <h1 id="processing-service" className="text-3xl font-extrabold mb-8 pb-4 border-b text-[var(--text-primary)]">Processing Service</h1>
                    <div id="ingestion-pipeline">
                        <IngestionPipeline />

                        {/* The Visual Link you requested */}
                        <div className="my-8 p-4 bg-[var(--bg-secondary)] border-l-2 border-[var(--text-primary)] text-sm text-[var(--text-secondary)]">
                            <strong>Flow Note:</strong> Once the Processing Service inserts the raw email, it immediately pushes a message to the <code>embedding_required_queue</code>, triggering the service below.
                        </div>

                        <NextChapter title="Embedding Service (RAG)" to="embedding-service" />
                    </div>
                </div>

                {/* --- EMBEDDING SERVICE --- */}
                <div>
                    <h1 id="embedding-service" className="text-3xl font-extrabold mb-8 pb-4 border-b text-[var(--text-primary)]">Embedding Service</h1>
                    <div id="rag-worker">
                        <RagWorker />
                        <NextChapter title="Infrastructure & Weaviate" to="weaviate-ollama" />
                    </div>
                </div>

                {/* GROUP 3 */}
                <div>
                    <h1 id="infrastructure" className="text-3xl font-extrabold mb-8 pb-4 border-b text-[var(--text-primary)]">Infrastructure</h1>
                    <div id="weaviate-ollama" className="mb-16">
                        <SystemOps />
                    </div>
                    <div id="rabbitmq">
                        <RabbitMqFlows />
                    </div>
                </div>

            </div>
        </DocsLayout>
    );
}