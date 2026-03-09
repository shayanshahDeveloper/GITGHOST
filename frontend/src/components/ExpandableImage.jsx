import React, { useState, useEffect } from 'react';

const ExpandableImage = ({ src, alt }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <img
                src={src}
                alt={alt}
                onClick={() => setIsOpen(true)}
                className="rounded-md border border-zinc-800 mt-2 w-full object-cover shadow-sm cursor-pointer hover:border-zinc-700 transition-colors"
            />

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-zinc-950/80 backdrop-blur-md flex justify-center items-center p-4 md:p-10"
                    onClick={() => setIsOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 w-10 h-10 flex items-center justify-center rounded-md transition-colors z-50"
                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <img
                        src={src}
                        alt={alt}
                        className="max-h-[90vh] max-w-[90vw] rounded-lg border border-zinc-800 shadow-2xl object-contain relative z-40"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

export default ExpandableImage;
