import React from 'react';
import { CodeBlock } from '../../ui/CodeBlock';
import { Zap, AlertTriangle, GitMerge } from 'lucide-react';

export const IngestionPipeline = () => {
    return (
        <div className="space-y-12">

            {/* SECTION: FAST PATH */}
            <section id="processing-overview">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-500" /> Fast-Path Ingestion
                </h2>
                <p className="text-gray-600 mb-4">
                    The <code>processing-service</code> is designed for speed. It consumes from <code>email_processing_queue</code> with a prefetch of 10, prioritizing raw database insertion over AI analysis.
                </p>

                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                    <div>
                        <h4 className="font-bold text-yellow-800">Intent Detection Skipped</h4>
                        <p className="text-sm text-yellow-800">
                            To maximize throughput during initial syncs, this service sets <code>intent: "none"</code>. AI analysis happens lazily or on-demand later.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION: IDEMPOTENCY */}
            <section id="idempotency">
                <h3 className="text-lg font-semibold flex items-center gap-2 mt-8">
                    <GitMerge className="text-green-500" /> Idempotency & Deduplication
                </h3>
                <p className="text-gray-600 mb-4">
                    Since RabbitMQ guarantees "at-least-once" delivery, duplicate messages can occur. This service prevents duplicates using the <code>internal_message_id</code> (the Gmail Message-ID).
                </p>

                <CodeBlock
                    filename="processing-service/index.js"
                    code={`// 1. Check DB for Duplicates
const checkRes = await dbClient.query(
  "SELECT 1 FROM emails WHERE internal_message_id = $1",
  [emailData.internal_message_id]
);

if (checkRes.rowCount > 0) {
  console.log("Duplicate detected. Skipping.");
  // We ACK the message so it leaves the queue
  rabbitChannel.ack(msg);
  return;
}`}
                />
            </section>
        </div>
    );
};