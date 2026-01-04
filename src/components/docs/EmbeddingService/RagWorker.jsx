import React from 'react';
import { CodeBlock } from '../../ui/CodeBlock';
import { Database, FileText, Cpu } from 'lucide-react';

export const RagWorker = () => {
    return (
        <div className="space-y-12">

            {/* SECTION: WORKER OVERVIEW */}
            <section id="embedding-overview">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Database className="text-indigo-500" /> Vectorization Worker
                </h2>
                <p className="text-gray-600 mb-4">
                    The <code>embedding-service</code> is a standalone microservice responsible for turning raw text into semantic vectors. It listens to the <code>embedding_required_queue</code> in RabbitMQ.
                </p>
                <p className="text-gray-600 mb-6">
                    It uses <strong>LangChain</strong> to split long emails into smaller chunks and <strong>Ollama</strong> (via Weaviate) to generate embeddings.
                </p>
            </section>

            {/* SECTION: WEAVIATE SCHEMA */}
            <section id="weaviate-schema">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="text-blue-400" /> Schema Definition
                </h3>
                <p className="text-gray-600 mb-4">
                    The service automatically checks for and creates the <code>EmailChunks</code> class on startup. It is configured to use the <code>text2vec-ollama</code> module.
                </p>
                <p className="text-gray-600 mb-4">
                    <strong>Crucial:</strong> We vectorize <code>subject</code>, <code>from</code>, and <code>chunk_text</code> together to ensure searches like "emails from Amazon" work semantically.
                </p>

                <CodeBlock
                    filename="embedding-service/index.js"
                    code={`const schemaConfig = {
  name: "EmailChunks",
  vectorizers: vectors.text2VecOllama({
    apiEndpoint: "http://ollama:11434",
    model: "nomic-embed-text",
    properties: ["from", "subject", "chunk_text"], // <--- Combined Vectorization
  }),
  properties: [
    { name: "email_id", dataType: "uuid" },
    { name: "tenant_id", dataType: "uuid" },
    { name: "chunk_text", dataType: "text" },
    // ...
  ],
};`}
                />
            </section>

            {/* SECTION: CHUNKING STRATEGY */}
            <section id="chunking-strategy">
                <h3 className="text-lg font-semibold flex items-center gap-2 mt-8">
                    <Cpu className="text-red-400" /> Text Splitting Strategy
                </h3>
                <p className="text-gray-600 mb-4">
                    We use <code>RecursiveCharacterTextSplitter</code> from LangChain. This prevents token overflow errors in the LLM and ensures that long email threads are broken down into digestible semantic units.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                    <li><strong>Chunk Size:</strong> 512 characters</li>
                    <li><strong>Overlap:</strong> 50 characters (preserves context between chunks)</li>
                    <li><strong>Safety:</strong> Emails with {'>'}300 chunks are skipped to prevent system overload.</li>
                </ul>
            </section>
        </div>
    );
};