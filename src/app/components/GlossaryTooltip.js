import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

export function GlossaryTooltip({ children, explanation }) {
    const ref = useRef();
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
        visible: false,
    });

    const showTooltip = (e) => {
        const rect = e.target.getBoundingClientRect();
        setPosition({
            top: rect.top + window.scrollY - 8,
            left: rect.left + rect.width / 2,
            visible: true,
        });
    };

    const hideTooltip = () => {
        setPosition((pos) => ({ ...pos, visible: false }));
    };

    return (
        <>
            <span
                ref={ref}
                className="relative text-teal-700 font-semibold cursor-help"
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
            >
                {children}
            </span>
            {position.visible &&
                createPortal(
                    <div
                        className="absolute z-[9999] w-64 bg-gray-700 text-white text-sm rounded px-3 py-2 whitespace-normal text-left pointer-events-none transition-opacity duration-200"
                        style={{
                            top: position.top,
                            left: position.left,
                            transform: 'translate(-50%, -100%)',
                            position: 'absolute',
                        }}
                    >
                        {explanation}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700"></div>
                    </div>,
                    document.body
                )}
        </>
    );
}
