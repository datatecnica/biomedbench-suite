import React from "react";
import { LeaderboardTable } from "../components/LeaderboardTable";
import { useBenchmarkData } from "../lib/useBenchmarkData";
import type { BenchmarkAuthor, BenchmarkLeaderboard } from "../lib/types";
import { useLocation } from "react-router-dom";

type Props = {
  dataPath: string;
};

const relatedLinks = [
  {
    title: "codon.bio",
    href: "https://codon.bio/",
    description: "An AI co-scientist for all of your biomedical research needs.",
  },
];

function renderWithLinks(text: string) {
  const urlPattern = /https?:\/\/[^\s,]+/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = urlPattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const url = match[0].replace(/[.,;:!?)]+$/, "");
    const tail = match[0].slice(url.length);
    parts.push(
      <a key={match.index} href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    );
    if (tail) parts.push(tail);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderAuthors(authors: BenchmarkAuthor[]) {
  return authors.map((author, index) => (
    <span key={`${author.name}-${index}`}>
      {author.link ? (
        <a href={author.link} target="_blank" rel="noreferrer">
          {author.name}
        </a>
      ) : (
        author.name
      )}
      {index < authors.length - 1 ? ", " : ""}
    </span>
  ));
}

export function BenchmarkPage({ dataPath }: Props) {
  const { data, error, loading } = useBenchmarkData(dataPath);
  const location = useLocation();

  if (loading) {
    return <section className="status-card">Loading benchmark data…</section>;
  }

  if (error || !data) {
    return (
      <section className="status-card">
        Unable to load this benchmark. {error ?? "Unknown error"}
      </section>
    );
  }

  const leaderboards: BenchmarkLeaderboard[] =
    data.leaderboards && data.leaderboards.length > 0
      ? data.leaderboards
      : data.columns && data.models
        ? [
            {
              id: "overall",
              title: "Current rankings",
              columns: data.columns,
              models: data.models,
            },
          ]
        : [];
  return (
    <div className="benchmark-layout">
      <aside className="benchmark-sidebar">
        <p className="benchmark-header__eyebrow benchmark-sidebar__eyebrow">
          Info
        </p>
        <article className="copy-card benchmark-sidebar__lead">
          <h2 className="benchmark-sidebar__title">About BiomedBench Suite</h2>
          <p className="benchmark-header__tagline benchmark-sidebar__tagline">
            <strong>BiomedBench Suite</strong> is a pair of benchmarks built on
            a shared set of 68,227 biomedical research questions and evaluated
            on two complementary modalities.
          </p>
          <p className="benchmark-header__tagline benchmark-sidebar__tagline">
            <strong>CARDBiomedBench</strong> evaluates open-ended QA in neurodegenerative
            disease research, scored for both accuracy and abstention.
            <strong> BiomedSQL</strong> extends the question set to a
            harmonized biomedical knowledge base and evaluates text-to-SQL
            generation that requires implicit domain reasoning.
          </p>
          <p className="benchmark-header__tagline benchmark-sidebar__tagline">
            <strong>BiomedBench Suite</strong> challenges LLMs across a range of biological
            reasoning and SQL categories, identifying failure modes that persist
            across modalities.
          </p>
          <a
            className="benchmark-pill"
            href="https://openreview.net/forum?id=YnyrQE7O7C#discussion"
            target="_blank"
            rel="noreferrer"
          >
            BiomedBench Suite Paper
          </a>
        </article>

        <article className="copy-card benchmark-sidebar__card">
          <h2 className="benchmark-sidebar__title">About Us</h2>
          <p>
            <strong>BiomedBench Suite</strong> is developed by the scientists and engineers at{" "}
            <a href="https://www.datatecnica.com/" target="_blank" rel="noreferrer">
              DataTecnica
            </a>
            . We are committed to developing an integrated suite of AI tools that enable
            rigorous analysis, reproducible workflows, and scalable discovery in
            biomedical research. Follow us on{" "}
            <a href="https://x.com/DataTecnica" target="_blank" rel="noreferrer">
              X
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/company/datatecnica/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{" "}
            to stay up to date with all of our releases, and check out some of our
            highlighted products below!
          </p>
          <a className="benchmark-pill" href="mailto:mathew@datatecnica.com">
            Contact Us
          </a>
        </article>

        <section className="info-links" aria-label="Related links">
          {relatedLinks.map((link) => (
            <a
              className="info-link-card"
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="info-link-card__icon"
                src={`${import.meta.env.BASE_URL}assets/project-icon.svg`}
                alt=""
                aria-hidden="true"
              />
              <span className="info-link-card__copy">
                <strong>{link.title}</strong>
                <span>{link.description}</span>
              </span>
            </a>
          ))}
        </section>
      </aside>

      <div className="page-stack benchmark-main">
        <section className="benchmark-header">
          <div className="benchmark-header__main">
            <p className="benchmark-header__eyebrow">Benchmark</p>
            <h2>{data.name}</h2>
            <p className="benchmark-header__tagline">{data.tagline}</p>
          </div>
          <div className="benchmark-header__meta">
            <span>Last updated</span>
            <strong>{data.lastUpdated}</strong>
          </div>
        </section>

        {data.links && (
          <div className="overview-pills">
            {data.links.paper && (
              <a
                className="overview-pill overview-pill--paper"
                href={data.links.paper}
                target="_blank"
                rel="noreferrer"
              >
                {data.name} Paper
              </a>
            )}
            {data.links.github && (
              <a
                className="overview-pill overview-pill--github"
                href={data.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
            {data.links.huggingface && (
              <a
                className="overview-pill overview-pill--huggingface"
                href={data.links.huggingface}
                target="_blank"
                rel="noreferrer"
              >
                HuggingFace
              </a>
            )}
          </div>
        )}

        <article className="copy-card overview-card">
          {data.authors && data.authors.length > 0 ? (
            <details className="overview-expander">
              <summary>
                <span className="overview-expander__label">Paper Authors</span>
                <span className="overview-expander__toggle">
                  <span className="overview-expander__toggle-more">More</span>
                  <span className="overview-expander__toggle-less">Less</span>
                </span>
              </summary>
              <p className="overview-expander__body overview-expander__body--authors">
                {renderAuthors(data.authors)}
              </p>
            </details>
          ) : null}
          <details className="overview-expander">
            <summary>
              <span className="overview-expander__label">Abstract</span>
              <span className="overview-expander__toggle">
                <span className="overview-expander__toggle-more">More</span>
                <span className="overview-expander__toggle-less">Less</span>
              </span>
            </summary>
            <p className="overview-expander__body">{renderWithLinks(data.abstract)}</p>
          </details>
          <details className="overview-expander">
            <summary>
              <span className="overview-expander__label">Citation</span>
              <span className="overview-expander__toggle">
                <span className="overview-expander__toggle-more">More</span>
                <span className="overview-expander__toggle-less">Less</span>
              </span>
            </summary>
            <pre className="overview-expander__body overview-expander__body--citation">
              <code>{data.citation ?? "Add benchmark citation here."}</code>
            </pre>
          </details>
        </article>
        {leaderboards.map((leaderboard) => (
          <LeaderboardTable
            key={leaderboard.id}
            title={leaderboard.title}
            description={leaderboard.description}
            columns={leaderboard.columns}
            rows={leaderboard.models}
          />
        ))}
      </div>
    </div>
  );
}
