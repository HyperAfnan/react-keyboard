import { StarCount } from "./StarCount";

export const Header = () => {
  return (
    <header className="mx-auto w-full max-w-[96rem] border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md 2xl:border-x 2xl:border-t">
      <div className="mx-auto flex h-[3rem] max-w-[96rem] items-center justify-between px-[1rem] sm:h-[3.5rem] sm:px-[1.5rem] lg:h-[4rem] lg:px-[2rem]">
        <div className="flex items-center space-x-[1rem] sm:space-x-[1.25rem] lg:space-x-[1.5rem]">
          <a
            href="/"
            className="group logo-hover-group flex items-center gap-[0.35rem] font-mono text-[0.875rem] font-bold tracking-tight text-white select-none transition-all sm:text-[0.9375rem] lg:text-[1.05rem]"
          >
            <kbd className="keycap-logo-base keycap-logo-r w-[1.5rem] h-[1.5rem] rounded-[4px] text-[0.75rem] sm:w-[1.625rem] sm:h-[1.625rem] sm:rounded-[5px] sm:text-[0.8125rem]">
              R
            </kbd>
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors mr-[0.15rem]">
              eact
            </span>
            <kbd className="keycap-logo-base keycap-logo-k w-[1.5rem] h-[1.5rem] rounded-[4px] text-[0.75rem] sm:w-[1.625rem] sm:h-[1.625rem] sm:rounded-[5px] sm:text-[0.8125rem]">
              K
            </kbd>
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
              eyboards
            </span>
          </a>
        </div>

        <div className="flex items-center space-x-[0.75rem] sm:space-x-[1rem]">
          <a
            href="https://github.com/HyperAfnan/react-keyboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-[0.375rem] text-zinc-400 transition-colors duration-200 hover:text-white sm:space-x-[0.5rem]"
          >
            <svg
              className="h-[1.125rem] w-[1.125rem] sm:h-[1.25rem] sm:w-[1.25rem]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            <span className="text-[0.75rem] leading-none font-semibold tabular-nums transition-all sm:text-[0.8125rem]">
              <StarCount />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
