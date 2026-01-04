// src/docs/ApiService/AiFeatures.jsx
import React from 'react';
import { CodeBlock } from '../../ui/CodeBlock';
import { Sparkles, BrainCircuit } from 'lucide-react';

export const AiFeatures = () => {
    return (
        <div className="space-y-12">

            {/* SECTION: HYBRID SEARCH */}
            <section id="hybrid-search">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BrainCircuit className="text-pink-500" /> Hybrid Search Architecture
                </h2>
                <p className="text-gray-600 mb-4">
                    The <code>/ai/search</code> endpoint implements a sophisticated <strong>Secure Hybrid Search</strong>. It merges results from three different algorithms to ensure high recall.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 border rounded bg-white shadow-sm">
                        <div className="font-bold text-gray-800">1. Semantic</div>
                        <div className="text-xs text-gray-500 mt-1">Weaviate</div>
                        <p className="text-sm mt-2">Finds meaning (e.g., "travel plans" finds "flight tickets"). Uses <code>nearText</code>.</p>
                    </div>
                    <div className="p-4 border rounded bg-white shadow-sm">
                        <div className="font-bold text-gray-800">2. Keyword</div>
                        <div className="text-xs text-gray-500 mt-1">Postgres TSVECTOR</div>
                        <p className="text-sm mt-2">Exact match search using <code>ts_rank_cd</code> on the email body.</p>
                    </div>
                    <div className="p-4 border rounded bg-white shadow-sm">
                        <div className="font-bold text-gray-800">3. Literal</div>
                        <div className="text-xs text-gray-500 mt-1">Postgres ILIKE</div>
                        <p className="text-sm mt-2">Optimized for email addresses (e.g., "@google.com").</p>
                    </div>
                </div>

                <CodeBlock
                    filename="api-service/ai.routes.js"
                    code={`const [semantic, keyword, literal] = await Promise.all([
  runSemanticSearch(q, tenant_id),
  runKeywordSearch(q, tenant_id),
  runLiteralSearch(q, tenant_id),
]);

// Results are merged and re-ranked by score
const finalResults = mergeResults(semantic, keyword, literal);`}
                />
            </section>

            {/* SECTION: RAG SUMMARIZATION */}
            <section id="rag-summary">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-yellow-500" /> RAG Summarization
                </h2>
                <p className="text-gray-600 mb-4">
                    The <code>/ai/summarize/:emailId</code> endpoint performs <strong>Retrieval Augmented Generation</strong>.
                </p>
                <p className="text-gray-600 mb-4">
                    It fetches the raw email text from Postgres (acting as the "Context") and feeds it into <strong>Gemini 2.5 Pro</strong> (or Flash as fallback) with a strict prompt to output HTML structure.
                </p>
            </section>

            {/* SECTION: SMART DRAFTS */}
            <section id="smart-drafts">
                <h3 className="text-lg font-semibold mt-8">Smart Drafting (JSON Mode)</h3>
                <p className="text-gray-600 mb-4">
                    The <code>/ai/draft</code> endpoint uses <strong>Gemini JSON Mode</strong> to ensure the AI output is perfectly machine-readable. It generates a valid JSON object containing <code>to</code>, <code>subject</code>, and <code>body</code>.
                </p>
                <CodeBlock
                    filename="api-service/ai.routes.js"
                    code={`const jsonSchema = {
  type: "OBJECT",
  properties: {
    to: { type: "ARRAY", items: { type: "STRING" } },
    subject: { type: "STRING" },
    body: { type: "STRING" },
  },
  required: ["to", "subject", "body"],
};

// Generates structured JSON, guaranteed.
await genAI.models.generateContent({
  model: "gemini-2.5-pro",
  generationConfig: { responseMimeType: "application/json", responseSchema: jsonSchema },
  // ...
});`}
                />
            </section>
        </div>
    );
};