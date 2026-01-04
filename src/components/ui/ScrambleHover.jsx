import React, { useState, useEffect } from 'react';

const ScrambleHover = ({
    text,
    className,
    duration = 30,
    active = false,
    useHover = true,
    autoComplete = false
}) => {
    const [display, setDisplay] = useState(text);
    const [internalHover, setInternalHover] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

    const trigger = useHover ? internalHover : active;

    useEffect(() => {
        if (trigger && !isAnimating) {
            setIsAnimating(true);
            let iteration = 0;

            const interval = setInterval(() => {
                setDisplay(prev =>
                    text.split("").map((letter, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    setIsAnimating(false);
                }

                iteration += 1 / 3;
            }, duration);

            if (!autoComplete) {
                return () => clearInterval(interval);
            }
        }
    }, [trigger, isAnimating, text, duration, autoComplete]);

    return (
        <span
            className={className}
            onMouseEnter={() => useHover && setInternalHover(true)}
            onMouseLeave={() => useHover && setInternalHover(false)}
        >
            {display}
        </span>
    );
};

export default ScrambleHover;