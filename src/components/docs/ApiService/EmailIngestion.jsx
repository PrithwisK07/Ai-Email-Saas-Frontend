// src/docs/ApiService/EmailIngestion.jsx
import React from 'react';
import { CodeBlock } from '../../ui/CodeBlock';
import { RefreshCw, Mail } from 'lucide-react';

export const EmailIngestion = () => {
    return (
        <div className="space-y-12">

            {/* SECTION: IMAP SYNC */}
            <section id="imap-sync">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <RefreshCw className="text-orange-500" /> IMAP Synchronization
                </h2>
                <p className="text-gray-600 mb-4">
                    The <code>/ingestion/sync</code> endpoint performs an <strong>incremental sync</strong>. It checks the <code>last_synced_at</code> timestamp for the user to avoid re-fetching old emails.
                </p>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-6">
                    <h4 className="font-bold text-blue-900 text-sm mb-2">Sync Workflow</h4>
                    <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                        <li>Fetch <code>last_synced_at</code> from DB.</li>
                        <li>Connect to Gmail via <strong>IMAP</strong>.</li>
                        <li>Stream emails & parse using <code>mailparser</code> (extracts HTML, Text, Attachments).</li>
                        <li>Push parsed emails to RabbitMQ <code>email_processing_queue</code>.</li>
                        <li>Update <code>last_synced_at</code>.</li>
                    </ol>
                </div>
            </section>

            {/* SECTION: EMAIL ACTIONS */}
            <section id="email-actions">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Mail className="text-purple-500" /> Actions & State
                </h2>
                <p className="text-gray-600 mb-4">
                    Handled in <code>email-actions.routes.js</code>. This module manages the state changes of an email.
                </p>

                <h3 className="text-lg font-semibold mt-4">Trash & Restoration Logic</h3>
                <p className="text-gray-600 mb-4">
                    The system intelligently manages vector embeddings when emails are deleted or restored to save costs and ensure search accuracy.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                    <li><strong>Move to Trash:</strong> The email status updates to 'trash' in Postgres, AND the associated vectors are <strong>deleted from Weaviate</strong>.</li>
                    <li><strong>Restore from Trash:</strong> The status updates to 'inbox', and the email is <strong>re-queued</strong> to RabbitMQ (`embedding_required_queue`) to regenerate embeddings.</li>
                </ul>

                <CodeBlock
                    filename="api-service/email-actions.routes.js"
                    code={`if (status === "trash") {
  // 1. Delete Vectors
  await collection.data.deleteMany(
    collection.filter.byProperty("email_id").equal(id)
  );
} else if (previousStatus === "trash") {
  // 2. Restore Vectors (Re-queue)
  await queueForEmbedding({ ...emailData });
}`}
                />
            </section>

            {/* SECTION: SENDING */}
            <section id="sending">
                <h3 className="text-lg font-semibold mt-8">Outbound Sending</h3>
                <p className="text-gray-600 mb-4">
                    Sending is a two-step process handled in <code>send.routes.js</code>:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li><strong>SMTP Transmission:</strong> Uses <code>nodemailer</code> to send the email immediately via Gmail.</li>
                    <li><strong>Database Record:</strong> Saves the sent email to Postgres with <code>status: 'sent'</code> so it appears in the UI immediately without waiting for an IMAP sync loop.</li>
                </ol>
            </section>
        </div>
    );
};