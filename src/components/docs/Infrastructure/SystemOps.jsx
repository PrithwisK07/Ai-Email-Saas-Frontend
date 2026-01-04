import React from 'react';
import { CodeBlock } from '../../ui/CodeBlock';
import { Container, Network, Layers } from 'lucide-react';

export const SystemOps = () => {
    return (
        <div className="space-y-12">

            {/* SECTION: CONTAINER ORCHESTRATION */}
            <section id="docker-infrastructure">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Container className="text-blue-600" /> Container Orchestration
                </h2>
                <p className="text-gray-600 mb-4">
                    The entire backend infrastructure is defined in <code>docker-compose.yml</code>. It orchestrates 4 core services on a shared bridge network named <code>ainetwork</code>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 border rounded bg-white">
                        <div className="font-bold">Postgres 15</div>
                        <div className="text-sm text-gray-500">Port: 5432</div>
                        <p className="text-xs mt-2">Primary relational store. Stores Users, Tenants, and Emails.</p>
                    </div>
                    <div className="p-4 border rounded bg-white">
                        <div className="font-bold">RabbitMQ 3.8</div>
                        <div className="text-sm text-gray-500">Port: 5672 (AMQP), 15672 (UI)</div>
                        <p className="text-xs mt-2">Message broker for decoupling ingestion and embedding.</p>
                    </div>
                    <div className="p-4 border rounded bg-white">
                        <div className="font-bold">Ollama</div>
                        <div className="text-sm text-gray-500">Port: 11434</div>
                        <p className="text-xs mt-2">Local LLM inference server. Hosts <code>nomic-embed-text</code>.</p>
                    </div>
                    <div className="p-4 border rounded bg-white">
                        <div className="font-bold">Weaviate</div>
                        <div className="text-sm text-gray-500">Port: 8080</div>
                        <p className="text-xs mt-2">Vector Search Engine. Connects to Ollama for vectorization.</p>
                    </div>
                </div>
            </section>

            {/* SECTION: WEAVIATE OLLAMA LINK */}
            <section id="weaviate-ollama">
                <h3 className="text-lg font-semibold flex items-center gap-2 mt-8">
                    <Layers className="text-purple-600" /> The Weaviate-Ollama Link
                </h3>
                <p className="text-gray-600 mb-4">
                    This is the most critical configuration. Weaviate must be able to "talk" to Ollama to generate vectors. This is achieved via the <code>ENABLE_MODULES</code> environment variable.
                </p>

                <CodeBlock
                    filename="docker-compose.yml"
                    code={`weaviate:
  image: cr.weaviate.io/semitechnologies/weaviate:latest
  environment:
    # 1. Enable the module
    ENABLE_MODULES: 'text2vec-ollama,generative-ollama'
    # 2. Set default vectorizer
    DEFAULT_VECTORIZER_MODULE: 'text2vec-ollama'
  depends_on:
    - ollama`}
                />

                <p className="text-gray-600 text-sm mt-4">
                    <strong>Note:</strong> In the Weaviate schema (JS code), we point to <code>http://ollama:11434</code> because <code>ollama</code> is the <strong>hostname</strong> defined in the Docker Compose service.
                </p>
            </section>
        </div>
    );
};