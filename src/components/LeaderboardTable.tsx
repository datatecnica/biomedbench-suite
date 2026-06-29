import React, { useState, useMemo } from "react";
import type { BenchmarkColumn, BenchmarkModel } from "../lib/types";

function renderDescription(text: string) {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(<a key={match.index} href={match[2]} target="_blank" rel="noreferrer">{match[1]}</a>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

type Props = {
  title?: string;
  description?: string;
  columns: BenchmarkColumn[];
  rows: BenchmarkModel[];
};

type SortState = { key: string; dir: "asc" | "desc" };

function formatValue(value: string | number | boolean | undefined) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : value.toFixed(1);
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return value ?? "—";
}

export function LeaderboardTable({
  title = "Current rankings",
  description,
  columns,
  rows,
}: Props) {
  const [sort, setSort] = useState<SortState | null>(null);

  const numericKeys = useMemo(
    () => new Set(columns.filter((c) => rows.some((r) => typeof r[c.key] === "number")).map((c) => c.key)),
    [columns, rows]
  );

  const columnMaxima = useMemo(() => {
    const maxima: Record<string, number> = {};
    const modelRows = rows.filter((r) => !r.isBaseline);
    for (const key of numericKeys) {
      const values = modelRows.map((r) => r[key]).filter((v): v is number => typeof v === "number");
      if (values.length > 0) maxima[key] = Math.max(...values);
    }
    return maxima;
  }, [rows, numericKeys]);

  const sortedRows = useMemo(() => {
    const baselines = rows.filter((r) => r.isBaseline);
    const models = rows.filter((r) => !r.isBaseline);
    const sorted = sort
      ? [...models].sort((a, b) => {
          const av = a[sort.key];
          const bv = b[sort.key];
          if (typeof av === "number" && typeof bv === "number") {
            return sort.dir === "desc" ? bv - av : av - bv;
          }
          return 0;
        })
      : models;
    return [...baselines, ...sorted];
  }, [rows, sort]);

  function handleSort(key: string) {
    if (!numericKeys.has(key)) return;
    setSort((prev) => {
      if (prev?.key !== key) return { key, dir: "desc" };
      if (prev.dir === "desc") return { key, dir: "asc" };
      return null;
    });
  }

  return (
    <section className="table-card">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Leaderboard</p>
          <h2>{title}</h2>
          <p className="section-heading__copy">
            {description ? renderDescription(description) : <>Replace placeholder results with your benchmark outputs by editing the JSON files in <code>public/data</code>.</>}
          </p>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                const sortable = numericKeys.has(column.key);
                const isActive = sort?.key === column.key;
                return (
                  <th
                    key={column.key}
                    onClick={sortable ? () => handleSort(column.key) : undefined}
                    className={sortable ? "th-sortable" + (isActive ? " th-sortable--active" : "") : undefined}
                    aria-sort={isActive ? (sort!.dir === "desc" ? "descending" : "ascending") : undefined}
                  >
                    {column.label}
                    {sortable && (
                      <span className="sort-icon" aria-hidden>
                        {isActive ? (sort!.dir === "desc" ? " ↓" : " ↑") : " ↕"}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr key={`${row.rank}-${row.model}`} className={row.isBaseline ? "baseline-row" : undefined}>
                {columns.map((column) => {
                  const value = row[column.key];
                  const isModelColumn = column.key === "model";
                  const isBest = !row.isBaseline && typeof value === "number" && column.key !== "rank" && columnMaxima[column.key] === value;
                  const medals: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };
                  const isRankColumn = column.key === "rank";
                  const medal = isRankColumn && !row.isBaseline && row.rank in medals ? medals[row.rank] : null;
                  const formatted =
                    isModelColumn && row.link ? (
                      <a href={row.link} target="_blank" rel="noreferrer">
                        {formatValue(value)}
                      </a>
                    ) : (
                      formatValue(value)
                    );

                  const display = isRankColumn && row.isBaseline
                    ? "—"
                    : medal ? <span className="medal">{medal}</span>
                    : isBest ? <strong>{formatted}</strong>
                    : formatted;

                  return <td key={column.key}>{display}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
