import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/cardbiomedbench", label: "CARDBiomedBench" },
  { to: "/biomedsql", label: "BiomedSQL" },
];

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <>
      <div className="top-banner">
        <div className="top-banner__inner" aria-label="Partner logos">
          <a
            className="top-banner__link"
            href="https://www.datatecnica.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Data Tecnica"
          >
            <img
              className="top-banner__logo top-banner__logo--dt"
              src={`${import.meta.env.BASE_URL}assets/dt-logo.webp`}
              alt="DT logo"
            />
          </a>
          <a
            className="top-banner__link"
            href="https://card.nih.gov/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit NIH CARD"
          >
            <img
              className="top-banner__logo top-banner__logo--card"
              src={`${import.meta.env.BASE_URL}assets/card-logo.jpeg`}
              alt="CARD logo"
            />
          </a>
          <a
            className="top-banner__link"
            href="https://codon.bio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit codon.bio"
          >
            <img
              className="top-banner__logo top-banner__logo--codon"
              src={`${import.meta.env.BASE_URL}assets/project-icon.svg`}
              alt="codon.bio logo"
            />
          </a>
        </div>
      </div>
      <div className="site-shell">
        <header className="hero">
          <div className="hero__content">
            <div className="hero__brand">
              <img
                className="hero__logo"
                src={`${import.meta.env.BASE_URL}assets/cardai.png`}
                alt="Card AI logo"
              />
            </div>
            <div className="hero__copy">
              <h1>BiomedBench Suite</h1>
              <p className="hero__lede">
                Benchmarks for Biomedical Reasoning and Text-to-SQL Tasks
              </p>
            </div>
          </div>
          <nav className="tabs" aria-label="Benchmark selection">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "tabs__link tabs__link--active" : "tabs__link"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <a href="https://openreview.net/forum?id=YnyrQE7O7C#discussion" target="_blank" rel="noreferrer">BiomedBench Suite</a>
          <a href="https://www.datatecnica.com/" target="_blank" rel="noreferrer">DataTecnica</a>
        </footer>
      </div>
    </>
  );
}
