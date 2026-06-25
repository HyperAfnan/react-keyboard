import { useState } from 'react'
import { CopyIcon } from './CopyIcon'

function CopyComponent() {
    const [copied, setCopied] = useState(false);

    const clipboardHandler = async () => {
        try {
            await navigator.clipboard.writeText("npm i react-keyboards");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <button
            type="button"
            onClick={clipboardHandler}
            className="group relative flex items-center gap-2 sm:gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-xs sm:text-sm md:text-base text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60 active:scale-[0.98] cursor-pointer shadow-md focus:outline-none focus:ring-1 focus:ring-zinc-700/50"
            aria-label="Copy npm install command"
            title="Click to copy"
        >
            <span className="text-zinc-500 select-none">$</span>
            <code className="text-zinc-200">npm i react-keyboards</code>

            <div className="ml-1 flex items-center justify-center border-l border-zinc-800 pl-2 sm:pl-3">
                {copied ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-400"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <CopyIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-500 transition-colors group-hover:text-zinc-300" />
                )}
            </div>
        </button>
    )
}

export default CopyComponent