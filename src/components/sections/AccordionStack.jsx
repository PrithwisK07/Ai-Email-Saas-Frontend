import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import db from "../../../public/db.png";
import express from "../../../public/express.png";
import broker from "../../../public/broker.png";
import infer from "../../../public/infer.png";

const systems = [
  {
    id: 1,
    brand: "Gateway",
    name: "Express.js API",
    subtitle: "Synchronous User Interaction",
    // FIX 1: Assign variable directly, don't wrap in {}
    image: express,
    specs: {
      "Role": "API Gateway",
      "Protocol": "REST / HTTP",
      "Function": "Auth & Routing",
      "State": "Stateless"
    },
    badges: ["Handles Auth", "Rate Limiting", "User-Facing"]
  },
  {
    id: 2,
    brand: "Broker",
    name: "RabbitMQ Cluster",
    subtitle: "Asynchronous Workload Manager",
    image: broker, // Fixed
    specs: {
      "Role": "Message Bus",
      "Queues": "Ingestion / AI / Sending",
      "Pattern": "Producer-Consumer",
      "Uptime": "99.99%"
    },
    badges: ["Shock Absorber", "High Throughput", "Non-Blocking"]
  },
  {
    id: 3,
    brand: "Memory",
    name: "Weaviate Vector DB",
    subtitle: "Semantic Knowledge Base",
    image: db, // Fixed
    specs: {
      "Role": "Vector Store",
      "Model": "nomic-embed-text",
      "Dims": "768 Dimensions",
      "Query": "Hybrid Search"
    },
    badges: ["RAG Engine", "Long-term Memory", "Context Aware"]
  },
  {
    id: 4,
    brand: "Inference",
    name: "Ollama Engine",
    subtitle: "Local LLM Runtime",
    image: infer, // Fixed
    specs: {
      "Role": "Inference Server",
      "Model": "Qwen 2.5 (3B)",
      "Format": "4-bit Quantized",
      "Speed": "40-50 tokens/sec"
    },
    badges: ["Zero Latency", "100% Private", "No API Cost"]
  }
];

export default function AccordionStack() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const setActiveSlide = (index) => {
    if (currentIndex === index) {
      setCurrentIndex(-1);
    } else {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % systems.length;
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === -1
      ? systems.length - 1
      : (currentIndex - 1 + systems.length) % systems.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="app-container">
      <style>{`
        /* Scoped Styles for AccordionStack */
        
        .app-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        .slider-container {
          width: 100%;
          max-width: 1200px;
          height: 80vh;
          min-height: 600px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.05); 
          background: #000;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .now-showing {
          position: absolute;
          top: 30px;
          left: 30px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .now-showing::before {
          content: "";
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
        }

        .accordion-slider {
          display: flex;
          height: 100%;
          position: relative;
        }

        .slide {
          flex: 1;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-right: 1px solid rgba(255,255,255,0.1);
          transition: flex 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease;
          /* Images are grayscale when inactive */
          filter: grayscale(1) brightness(0.6); 
          will-change: flex, filter;
        }

        .slide:last-child {
          border-right: none;
        }

        .slide:hover {
          filter: grayscale(1) brightness(0.8);
        }

        .slide.active {
          flex: 3.5;
          /* Full color when active (or keeps grayscale if image is B&W) */
          filter: grayscale(0) brightness(1);
          cursor: default;
        }

        .slide-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          z-index: 0;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
          transform: scale(1);
          will-change: transform;
        }

        .slide.active .slide-bg {
          transform: scale(1.1);
        }

        /* Overlay to ensure text readability on complex images */
        .slide::before {
          content: "";
          position: absolute;
          top: -1px; left: -1px; right: -1px; bottom: -1px; 
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.95) 100%);
          opacity: 0.6;
          transition: opacity 0.8s ease;
          z-index: 1;
          pointer-events: none;
        }
        
        .slide.active::before {
          opacity: 0.8;
        }

        .slide-content {
          position: absolute;
          bottom: 30px;
          left: 30px;
          width: auto;
          min-width: 600px; 
          padding-right: 20px;
          color: white;
          z-index: 2;
          pointer-events: none;
        }

        .slide.active .slide-content {
          bottom: 60px;
          transition: bottom 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.1s;
        }

        .slide-number {
          font-size: 80px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.1);
          line-height: 1;
          position: absolute;
          top: 30px;
          right: 30px;
          z-index: 2;
          transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          backface-visibility: hidden;
        }

        .slide.active .slide-number {
          top: 30px;
          right: 30px;
          font-size: 120px;
          color: rgba(255, 255, 255, 0.15);
        }

        .car-brand {
          font-size: 18px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 5px;
          transform: rotate(-90deg);
          transform-origin: left bottom;
          position: absolute;
          bottom: 100px;
          left: 40px;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 2px;
          z-index: 2;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          backface-visibility: hidden;
        }

        .slide.active .car-brand {
          transform: rotate(0deg);
          position: static;
          transform-origin: unset;
          color: #fff;
          margin-bottom: 10px;
          transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .car-name, .car-subtitle, .car-specs, .performance-badges {
          opacity: 0;
          transform: translateY(20px) translateZ(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
          backface-visibility: hidden;
          will-change: opacity, transform;
        }

        .car-name {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1.1;
          color: #fff;
        }

        .car-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 30px;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .car-specs {
          max-width: 500px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.2);
        }

        .performance-badges {
          display: flex;
          gap: 12px;
          margin-top: 30px;
        }

        .slide.active .car-name {
          opacity: 1;
          transform: translateY(0) translateZ(0);
          transition: opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.2s;
        }

        .slide.active .car-subtitle {
          opacity: 1;
          transform: translateY(0) translateZ(0);
          transition: opacity 0.8s ease-out 0.3s, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.3s;
        }

        .slide.active .car-specs {
          opacity: 1;
          transform: translateY(0) translateZ(0);
          transition: opacity 0.8s ease-out 0.4s, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.4s;
        }

        .slide.active .performance-badges {
          opacity: 1;
          transform: translateY(0) translateZ(0);
          transition: opacity 0.8s ease-out 0.7s, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.7s;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
          opacity: 0;
          transform: translateX(-20px) translateZ(0);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .slide.active .spec-row {
          opacity: 1;
          transform: translateX(0) translateZ(0);
          transition: opacity 0.6s ease 0.5s, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.5s;
        }
        .slide.active .spec-row:nth-child(2) { transition-delay: 0.55s; }
        .slide.active .spec-row:nth-child(3) { transition-delay: 0.6s; }
        .slide.active .spec-row:nth-child(4) { transition-delay: 0.65s; }

        .spec-label { color: rgba(255, 255, 255, 0.5); text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
        .spec-value { color: white; font-weight: 500; }

        .badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          opacity: 0;
          transform: scale(0.8) translateZ(0);
          transition: all 0.4s ease;
          backdrop-filter: blur(5px);
        }

        .slide.active .badge { 
          opacity: 1; 
          transform: scale(1) translateZ(0); 
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .slide.active .badge:nth-child(1) { transition-delay: 0.75s; }
        .slide.active .badge:nth-child(2) { transition-delay: 0.8s; }
        .slide.active .badge:nth-child(3) { transition-delay: 0.85s; }

        .badge-icon {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(255,255,255,0.8);
        }

        .add-button {
          position: absolute;
          bottom: 30px;
          right: 30px;
          width: 40px;
          height: 40px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s ease;
          z-index: 3;
        }
        
        .slide:hover .add-button {
           border-color: #fff;
           background: rgba(255, 255, 255, 0.1);
        }

        .add-button::before, .add-button::after {
          content: "";
          position: absolute;
          background: white;
          transition: all 0.4s ease;
        }
        
        .slide:hover .add-button::before,
        .slide:hover .add-button::after {
          background: #fff;
        }

        .add-button::before { width: 14px; height: 1px; }
        .add-button::after { width: 1px; height: 14px; transform: rotate(0deg); }

        .slide.active .add-button {
          border-color: #fff;
          transform: rotate(45deg);
        }
        .slide.active .add-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .slide.active .add-button::before, 
        .slide.active .add-button::after {
          background: #fff;
        }

        .navigation-arrows {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          color: white;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 4;
          backdrop-filter: blur(10px);
          outline: none;
        }

        .nav-prev { left: 20px; }
        .nav-next { right: 20px; }

        .navigation-arrows:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #fff;
          transform: translateY(-50%) scale(1.1);
        }

        @media (max-width: 768px) {
          .accordion-slider { flex-direction: column; }
          .slide { width: 100%; height: 80px; flex: none; }
          .slide.active { height: auto; flex: 1; }
          .slide-number { font-size: 32px; top: 20px; right: 20px; }
          .car-brand { transform: none; position: static; margin-bottom: 0; }
          
          .slide-content { 
            bottom: 20px; 
            left: 20px; 
            min-width: unset; 
            width: auto; 
            right: 20px; 
          }
          
          .slide.active .slide-content { bottom: 20px; }
          .car-name { font-size: 28px; }
          .slider-container { height: 100vh; border-radius: 0; border: none; }
          .navigation-arrows { display: none; }
          .slide.active .slide-bg { transform: scale(1); }
        }
      `}</style>

      <div className="slider-container">
        <div className="now-showing">System Architecture</div>

        <div className="accordion-slider">
          {systems.map((system, index) => {
            const isActive = currentIndex === index;
            return (
              <div
                key={system.id}
                className={`slide ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              >
                {/* Changed: Uses system.image instead of system.bg */}
                <div
                  className="slide-bg"
                  style={{ backgroundImage: `url('${system.image}')` }}
                />

                <div className="slide-number">0{index + 1}</div>

                <div className="slide-content">
                  <div className="car-brand">{system.brand}</div>
                  <div className="car-name">{system.name}</div>
                  <div className="car-subtitle">{system.subtitle}</div>

                  <div className="car-specs">
                    {Object.entries(system.specs).map(([label, value]) => (
                      <div className="spec-row" key={label}>
                        <span className="spec-label">{label}:</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="performance-badges">
                    {system.badges.map((badge, idx) => (
                      <div className="badge" key={idx}>
                        <div className="badge-icon"></div>
                        <span>{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="add-button"></div>
              </div>
            );
          })}
        </div>

        <button className="navigation-arrows nav-prev" onClick={prevSlide}>
          <ArrowLeft />
        </button>
        <button className="navigation-arrows nav-next" onClick={nextSlide}>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}