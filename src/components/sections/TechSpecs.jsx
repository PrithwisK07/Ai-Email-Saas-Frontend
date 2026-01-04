import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const TechSpecs = ({ onHoverStart, onHoverEnd }) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const techSpecs = [
        {
            title: 'Local Inference',
            category: 'PRIVACY',
            content: 'Email data contains PII. By using local quantization (Qwen 2.5 3B), no text ever leaves your server\'s VPC, reducing marginal costs to zero. ',
        },
        {
            title: 'Event-Driven Bus',
            category: 'SCALABILITY',
            content: 'Email systems are bursty. RabbitMQ acts as a shock absorber, queueing 1000s of emails to prevent API timeouts during ingestion spikes. ',
        },
        {
            title: 'Structured LLM',
            category: 'MODEL',
            content: 'Qwen 2.5 3B was selected for its superior performance in JSON extraction and adherence to rigid schema compared to Llama 3.2. ',
        },
        {
            title: 'Hybrid Search',
            category: 'DATA',
            content: 'Weaviate stores 768-dim embeddings for semantic search, while PostgreSQL handles indexed metadata for rapid SQL querying. ',
        }
    ];

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-up">
                <h2 className="text-4xl md:text-6xl font-bold">Deep Dive</h2>
                <span className="font-mono text-zinc-500 text-xs uppercase tracking-widest mt-4 md:mt-0">Tech Specs v1.0</span>
            </div>

            <div className="space-y-0 border-t border-zinc-800">
                {techSpecs.map((item, index) => (
                    <div
                        key={index}
                        className="border-b border-zinc-800 group reveal-up"
                        onMouseEnter={onHoverStart}
                        onMouseLeave={onHoverEnd}
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full py-10 flex justify-between items-center text-left focus:outline-none cursor-none group-hover:pl-8 transition-all duration-300"
                        >
                            <div className="flex items-baseline gap-4 md:gap-12">
                                <span className="font-mono text-xs text-zinc-600 w-24 uppercase tracking-widest hidden md:block group-hover:text-zinc-400 transition-colors">
                                    {`0${index + 1} / ${item.category}`}
                                </span>
                                <h3 className={`text-3xl md:text-4xl font-light tracking-tight transition-colors ${activeAccordion === index ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
                                    {item.title}
                                </h3>
                            </div>
                            <div className={`relative w-8 h-8 flex items-center justify-center border border-zinc-800 rounded-full transition-colors duration-300 ${activeAccordion === index ? 'bg-white border-white' : 'group-hover:border-zinc-500'}`}>
                                <Plus
                                    size={16}
                                    className={`absolute transition-all duration-300 ${activeAccordion === index ? 'rotate-90 opacity-0' : 'text-zinc-500 group-hover:text-white'}`}
                                />
                                <Minus
                                    size={16}
                                    className={`absolute transition-all duration-300 ${activeAccordion === index ? 'rotate-0 opacity-100 text-black' : '-rotate-90 opacity-0'}`}
                                />
                            </div>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeAccordion === index ? 'max-h-40 opacity-100 pb-10' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="md:pl-40">
                                <p className="text-zinc-400 leading-relaxed max-w-2xl font-mono text-sm">
                                    {`> ${item.content}`}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechSpecs;