import React from 'react';
import { Globe, ShieldCheck, Zap } from 'lucide-react';

export const ApiOverview = () => {
    return (
        <div className="space-y-12">
            <section id="api-overview">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="text-blue-600" /> API Service Overview
                </h2>
                <p className="text-gray-600 mb-6">
                    The API Service (running on port <code>3001</code>) is the primary interface for the Mailwise frontend. It is an Express.js application responsible for synchronous operations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-5 border rounded-lg bg-white shadow-sm">
                        <ShieldCheck className="text-green-500 mb-3" />
                        <h4 className="font-bold mb-1">Auth Guard</h4>
                        <p className="text-sm text-gray-600">
                            Validates JWTs and enforces tenant isolation for all secure routes.
                        </p>
                    </div>
                    <div className="p-5 border rounded-lg bg-white shadow-sm">
                        <Zap className="text-yellow-500 mb-3" />
                        <h4 className="font-bold mb-1">Orchestrator</h4>
                        <p className="text-sm text-gray-600">
                            Triggers background jobs (like IMAP Sync) by pushing messages to RabbitMQ.
                        </p>
                    </div>
                    <div className="p-5 border rounded-lg bg-white shadow-sm">
                        <Globe className="text-blue-500 mb-3" />
                        <h4 className="font-bold mb-1">Data Retrieval</h4>
                        <p className="text-sm text-gray-600">
                            Combines Postgres SQL queries with Weaviate Vector searches for RAG.
                        </p>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">Route Structure</h3>
                <ul className="space-y-2 border-l-2 border-gray-200 pl-4 text-gray-700">
                    <li><code>/auth/*</code> - Public routes for registration and login.</li>
                    <li><code>/ingestion/*</code> - Sync triggers and status checks.</li>
                    <li><code>/ai/*</code> - Intelligence features (Search, Draft, Summarize).</li>
                    <li><code>/emails/*</code> - CRUD operations on email entities (Star, Delete, Label).</li>
                </ul>
            </section>
        </div>
    );
};