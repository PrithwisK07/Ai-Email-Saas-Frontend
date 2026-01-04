import React from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { Terminal, Download, Settings, Play } from 'lucide-react';

export const Installation = () => {
    return (
        <div className="space-y-12">
            <section id="installation">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--text-primary)]">
                    <Terminal className="opacity-70" /> Installation & Setup
                </h2>
                <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                    The entire infrastructure is containerized. You do not need to install Postgres or Weaviate locally; Docker Compose handles the heavy lifting. Follow these steps to get the backend running.
                </p>

                {/* STEP 1: CLONE */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-3 text-[var(--text-primary)]">
                        <span className="bg-[var(--text-primary)] text-[var(--bg-primary)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono">1</span>
                        Clone Repository
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">
                        Download the source code from GitHub.
                    </p>
                    <CodeBlock
                        filename="Terminal"
                        code={`git clone https://github.com/PrithwisK07/Ai-Email-Saas-.git
cd Ai-Email-Saas-`}
                    />
                </div>

                {/* STEP 2: ENV VARS */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-3 text-[var(--text-primary)]">
                        <span className="bg-[var(--text-primary)] text-[var(--bg-primary)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono">2</span>
                        Environment Configuration
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">
                        Create a <code>.env</code> file in the project root. This file is shared across all services (API, Processing, Embedding).
                    </p>
                    <CodeBlock
                        filename=".env"
                        code={`# Database Credentials
POSTGRES_USERNAME=postgres
POSTGRES_PWD=yourpassword
POSTGRES_DATABASE=mailwise
POSTGRES_HOST=postgres

# Auth Security
JWT_SECRET=supersecret_dev_key

# Message Queue
RABBITMQ_URL=amqp://rabbitmq:5672

# AI Services
GEMINI_API_KEY=your_google_gemini_key`}
                    />
                </div>

                {/* STEP 3: DOCKER BOOT */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-3 text-[var(--text-primary)]">
                        <span className="bg-[var(--text-primary)] text-[var(--bg-primary)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono">3</span>
                        Boot Infrastructure
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">
                        Start the supporting infrastructure (DB, Queue, Vector Store, LLM) in detached mode.
                    </p>
                    <CodeBlock
                        filename="Terminal"
                        code={`docker-compose up -d`}
                    />
                    <div className="mt-4 p-4 border border-[var(--border-color)] rounded bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]">
                        <strong>Verification:</strong> Run <code>docker ps</code> and ensure <code>ollama_service</code> is healthy. It is critical for the Embedding Service.
                    </div>
                </div>

                {/* STEP 4: DEPENDENCIES */}
                <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-3 text-[var(--text-primary)]">
                        <span className="bg-[var(--text-primary)] text-[var(--bg-primary)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono">4</span>
                        Install Microservice Dependencies
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">
                        Install Node.js packages for each independent service.
                    </p>
                    <CodeBlock
                        filename="Terminal"
                        code={`# API Service
cd services/api-service && npm install

# Processing Service
cd ../processing-service && npm install

# Embedding Service
cd ../embedding-service && npm install`}
                    />
                </div>
            </section>
        </div>
    );
};