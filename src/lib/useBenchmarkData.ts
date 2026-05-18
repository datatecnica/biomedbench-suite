import { useEffect, useState } from "react";
import type { BenchmarkData } from "./types";

type State = {
  data: BenchmarkData | null;
  error: string | null;
  loading: boolean;
};

export function useBenchmarkData(dataPath: string) {
  const [state, setState] = useState<State>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ data: null, error: null, loading: true });

      try {
        const normalizedPath = dataPath.replace(/^\/+/, "");
        const resolvedPath = `${import.meta.env.BASE_URL}${normalizedPath}`;
        const response = await fetch(resolvedPath);
        if (!response.ok) {
          throw new Error(`Failed to load ${resolvedPath}`);
        }

        const payload = (await response.json()) as BenchmarkData;
        if (!cancelled) {
          setState({ data: payload, error: null, loading: false });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            error:
              error instanceof Error ? error.message : "Unexpected fetch error",
            loading: false,
          });
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [dataPath]);

  return state;
}
