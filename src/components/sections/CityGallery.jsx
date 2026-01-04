import React, { useEffect, useRef } from 'react';

// Data representing the AI Email Processing Pipeline
const STEPS = [
    {
        title: 'Ingestion',
        num: '01',
        desc: 'SMTP Handshake',
        img: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Parsing',
        num: '02',
        desc: 'Header Extraction',
        img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Sanitizing',
        num: '03',
        desc: 'HTML Cleaning',
        img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Embedding',
        num: '04',
        desc: 'Vectorization',
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Storage',
        num: '05',
        desc: 'Weaviate Index',
        img: 'https://images.unsplash.com/photo-1544197150-b99a580bbc7c?q=80&w=1995&auto=format&fit=crop'
    },
    {
        title: 'Retrieval',
        num: '06',
        desc: 'Context RAG',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Inference',
        num: '07',
        desc: 'Local LLM',
        img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Drafting',
        num: '08',
        desc: 'Response Gen',
        img: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2074&auto=format&fit=crop'
    },
    {
        title: 'Encryption',
        num: '09',
        desc: 'Security Seal',
        img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Delivery',
        num: '10',
        desc: 'SMTP Outbound',
        img: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d5b?q=80&w=2070&auto=format&fit=crop'
    },
];

const PipelineGallery = () => {
    const containerRef = useRef(null);
    const itemsRef = useRef([]);
    const cursorsRef = useRef([]);

    // State variables managed via useRef to avoid frequent re-renders during animation
    const state = useRef({
        progress: 50,
        startX: 0,
        active: 0,
        isDown: false,
        speedWheel: 0.02,
        speedDrag: -0.1,
    });

    useEffect(() => {
        // Utility to calculate Z-index based on active item
        const getZindex = (array, index) =>
            array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));

        const displayItems = (item, index, active) => {
            if (!item) return;
            const zIndex = getZindex(STEPS, active)[index];
            item.style.setProperty('--zIndex', zIndex);
            item.style.setProperty('--active', (index - active) / STEPS.length);
        };

        const animate = () => {
            // Clamp progress
            state.current.progress = Math.max(0, Math.min(state.current.progress, 100));

            // Calculate active index
            state.current.active = Math.floor(state.current.progress / 100 * (STEPS.length - 1));

            // Update DOM
            itemsRef.current.forEach((item, index) => displayItems(item, index, state.current.active));
        };

        // Initial animation
        animate();

        // -- Event Handlers --

        const handleWheel = (e) => {
            if (containerRef.current && containerRef.current.contains(e.target)) {
                // e.preventDefault(); // Uncomment if you want to lock page scroll
                const wheelProgress = e.deltaY * state.current.speedWheel;
                state.current.progress += wheelProgress;
                animate();
            }
        };

        const handleMouseMove = (e) => {
            if (cursorsRef.current[0] && cursorsRef.current[1]) {
                const x = e.clientX;
                const y = e.clientY;
                cursorsRef.current[0].style.transform = `translate(${x}px, ${y}px)`;
                cursorsRef.current[1].style.transform = `translate(${x}px, ${y}px)`;
            }

            if (!state.current.isDown) return;

            const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const mouseProgress = (x - state.current.startX) * state.current.speedDrag;
            state.current.progress += mouseProgress;
            state.current.startX = x;
            animate();
        };

        const handleMouseDown = (e) => {
            if (containerRef.current && containerRef.current.contains(e.target)) {
                state.current.isDown = true;
                state.current.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            }
        };

        const handleMouseUp = () => {
            state.current.isDown = false;
        };

        window.addEventListener('wheel', handleWheel);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchstart', handleMouseDown);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchstart', handleMouseDown);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    const handleItemClick = (i) => {
        state.current.progress = (i / STEPS.length) * 100 + 10;
        state.current.active = Math.floor(state.current.progress / 100 * (STEPS.length - 1));
        const getZindex = (array, index) => array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));
        itemsRef.current.forEach((item, index) => {
            if (!item) return;
            const zIndex = getZindex(STEPS, state.current.active)[index];
            item.style.setProperty('--zIndex', zIndex);
            item.style.setProperty('--active', (index - state.current.active) / STEPS.length);
        });
    };

    return (
        <div ref={containerRef} className="pipeline-gallery-container relative w-full h-screen overflow-hidden bg-black">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Roboto:wght@300;400&display=swap');

        .pipeline-gallery-container {
            font-family: 'Roboto', sans-serif;
            background: #000;
        }

        .carousel {
          position: relative;
          z-index: 1;
          height: 100vh;
          overflow: hidden;
          pointer-events: none;
        }

        .carousel-item {
          --items: 10;
          --width: clamp(150px, 30vw, 300px);
          --height: clamp(200px, 40vw, 400px);
          --x: calc(var(--active) * 800%);
          --y: calc(var(--active) * 200%);
          --rot: calc(var(--active) * 120deg);
          --opacity: calc(var(--zIndex) / var(--items) * 3 - 2);
          overflow: hidden;
          position: absolute;
          z-index: var(--zIndex);
          width: var(--width);
          height: var(--height);
          margin: calc(var(--height) * -0.5) 0 0 calc(var(--width) * -0.5);
          border-radius: 10px;
          top: 50%;
          left: 50%;
          user-select: none;
          transform-origin: 0% 100%;
          box-shadow: 0 10px 50px 10px rgba(0, 0, 0, .5);
          background: black;
          pointer-events: all;
          transform: translate(var(--x), var(--y)) rotate(var(--rot));
          transition: transform .8s cubic-bezier(0, 0.02, 0, 1);
        }

        .carousel-box {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: opacity .8s cubic-bezier(0, 0.02, 0, 1);
          opacity: var(--opacity);
          font-family: 'Playfair Display', serif;
        }

        .carousel-box:before {
          content: '';
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .5));
        }

        .title {
          position: absolute;
          z-index: 1;
          color: #fff;
          bottom: 20px;
          left: 20px;
          transition: opacity .8s cubic-bezier(0, 0.02, 0, 1);
          font-size: clamp(20px, 3vw, 30px);
          text-shadow: 0 4px 4px rgba(0, 0, 0, .1);
        }

        .num {
          position: absolute;
          z-index: 1;
          color: #fff;
          top: 10px;
          left: 20px;
          transition: opacity .8s cubic-bezier(0, 0.02, 0, 1);
          font-size: clamp(20px, 10vw, 80px);
        }
        
        /* New Subtitle / Description style */
        .desc {
          position: absolute;
          z-index: 1;
          color: rgba(255, 255, 255, 0.7);
          bottom: 50px; /* Above title */
          left: 22px;
          font-family: 'Roboto', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .carousel-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          filter: grayscale(1); /* Keep B&W theme until hovered/active if desired, or remove */
        }

        .layout {
          position: absolute;
          z-index: 0;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .layout:before {
          content: '';
          position: absolute;
          z-index: 1;
          top: 0;
          left: 90px;
          width: 10px;
          height: 100%;
          border: 1px solid #fff;
          border-top: none;
          border-bottom: none;
          opacity: .15;
        }

        .box {
          position: absolute;
          bottom: 0;
          left: 30px;
          color: #fff;
          transform-origin: 0% 10%;
          transform: rotate(-90deg);
          font-size: 9px;
          line-height: 1.4;
          text-transform: uppercase;
          opacity: .4;
        }

        .pipeline-cursor {
          position: fixed;
          z-index: 50;
          top: 0;
          left: 0;
          --size: 40px;
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, .2);
          margin: calc(var(--size) * -0.5) 0 0 calc(var(--size) * -0.5);
          transition: transform .85s cubic-bezier(0, 0.02, 0, 1);
          display: none;
          pointer-events: none;
        }

        .pipeline-cursor2 {
          --size: 2px;
          transition-duration: .7s;
          background-color: white;
          z-index: 50;
        }

        @media (pointer: fine) {
          .pipeline-cursor {
            display: block;
          }
        }
      `}</style>

            <div className="carousel">
                {STEPS.map((item, i) => (
                    <div
                        className="carousel-item"
                        key={i}
                        ref={(el) => (itemsRef.current[i] = el)}
                        onClick={() => handleItemClick(i)}
                    >
                        <div className="carousel-box">
                            <div className="num">{item.num}</div>
                            <div className="desc">{item.desc}</div>
                            <div className="title">{item.title}</div>
                            <img src={item.img} alt={item.title} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="layout">
                <div className="box">End-to-End<br />Local Intelligence<br />Processing Pipeline</div>
            </div>

            {/* Custom Cursors for this section */}
            <div className="pipeline-cursor" ref={(el) => (cursorsRef.current[0] = el)}></div>
            <div className="pipeline-cursor pipeline-cursor2" ref={(el) => (cursorsRef.current[1] = el)}></div>
        </div>
    );
};

export default PipelineGallery;