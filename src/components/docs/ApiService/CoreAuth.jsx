import React from 'react';
import { CodeBlock } from '../../ui/CodeBlock';
import { Shield, Server } from 'lucide-react';

export const CoreAuth = () => {
    return (
        <div className="space-y-12">

            {/* SECTION: SERVER ENTRY POINT */}
            <section id="server-setup">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                    <Server className="opacity-70" /> Server Entry Point
                </h2>
                <p className="text-[var(--text-secondary)] mb-4">
                    The <code>index.js</code> file is the central nervous system. It establishes connections to <strong>PostgreSQL</strong> and <strong>Weaviate</strong> before accepting traffic.
                </p>

                <div className="my-6 border-l-2 border-[var(--text-primary)] pl-6 py-2">
                    <h3 className="text-lg font-bold font-mono mb-2 text-[var(--text-primary)]">Critical Configurations</h3>
                    <ul className="list-none space-y-2 text-[var(--text-secondary)]">
                        <li className="flex gap-2">
                            <span className="text-[var(--text-primary)] font-bold">Payload Limits:</span>
                            <span>Configured to <code>50mb</code> for large attachments.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-[var(--text-primary)] font-bold">CORS:</span>
                            <span>Restricted to frontend origin.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-[var(--text-primary)] font-bold">Security:</span>
                            <span>Routes wrapped with <code>authenticateToken</code> middleware.</span>
                        </li>
                    </ul>
                </div>

                <CodeBlock
                    filename="api-service/index.js"
                    code={`// 1. Database Connections
const dbClient = await pgPool.connect();
weaviateClient = await weaviate.connectToLocal();

// 2. High Payload Limit for Attachments
app.use(express.json({ limit: "50mb" }));

// 3. Route Security
app.use("/auth", authRoutes(pgPool, genAI)); // Public
app.use("/ingestion", authenticateToken, ingestionRoutes(pgPool)); // Protected`}
                />
            </section>

            {/* SECTION: AUTHENTICATION FLOW */}
            <section id="auth-flow">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--text-primary)]">
                    <Shield className="opacity-70" /> Authentication & Security
                </h2>
                <p className="text-[var(--text-secondary)] mb-8">
                    Security is handled via <strong>JWT (JSON Web Tokens)</strong>. The system supports multi-tenancy, meaning every user belongs to a specific <code>tenant_id</code>.
                </p>

                {/* Improved Visibility Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)]">
                        <h4 className="font-bold font-mono text-lg mb-3 text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2 inline-block">
                            Registration
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                            Uses a <strong>SQL Transaction</strong>. Creates <code>Tenant</code> first, then <code>User</code>. Rolls back on failure to prevent orphaned data.
                        </p>
                        <div className="text-xs font-mono text-[var(--text-secondary)] opacity-60"></div>
                    </div>

                    <div className="p-6 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)]">
                        <h4 className="font-bold font-mono text-lg mb-3 text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2 inline-block">
                            Login Strategy
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                            Stateless validation via <code>bcrypt</code>. Signs a JWT containing <code>user_id</code> + <code>tenant_id</code>. Expires in 1 day.
                        </p>
                        <div className="text-xs font-mono text-[var(--text-secondary)] opacity-60"></div>
                    </div>
                </div>

                <h3 className="text-lg font-bold mb-3 text-[var(--text-primary)]">Middleware Strategy</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                    The <code>auth.middleware.js</code> intercepts secure requests, validates the signature using <code>process.env.JWT_SECRET</code>, and injects the user payload.
                </p>

                <CodeBlock
                    filename="api-service/auth.middleware.js"
                    code={`function authenticateToken(req, res, next) {
  const token = authHeader && authHeader.split(" ")[1];
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload.user; // Attach tenant info
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token." });
  }
}`}
                />
            </section>
        </div>
    );
};