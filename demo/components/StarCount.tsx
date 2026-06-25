import { useEffect, useState } from "react";

export function StarCount() {
  const [starCount, setStarCount] = useState<number | 0>(0);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/HyperAfnan/react-keyboard",
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }

        const json = (await response.json()) as {
          stargazers_count?: number;
        };

        setStarCount(json.stargazers_count ?? 0);
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
        setStarCount(0);
      }
    };

    fetchStars();
  }, []);

  return (
    <span className="translate-y-px leading-none tabular-nums">
      {starCount}
    </span>
  );
}
