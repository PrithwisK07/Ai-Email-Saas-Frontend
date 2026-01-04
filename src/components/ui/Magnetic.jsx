import React, { useRef, useState } from 'react';

const Magnetic = ({ children, strength = 30 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x / strength, y: y / strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            className="transition-transform duration-200 ease-out cursor-none inline-block"
        >
            {children}
        </div>
    );
};

export default Magnetic;