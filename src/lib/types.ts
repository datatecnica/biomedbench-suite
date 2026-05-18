export type BenchmarkMetric = {
  label: string;
  value: string;
  suffix?: string;
};

export type BenchmarkAuthor = {
  name: string;
  link?: string;
};

export type BenchmarkColumn = {
  key: string;
  label: string;
};

export type BenchmarkModel = {
  rank: number;
  model: string;
  organization: string;
  link?: string;
  isBaseline?: boolean;
  [key: string]: string | number | boolean | undefined;
};

export type BenchmarkLeaderboard = {
  id: string;
  title: string;
  description?: string;
  columns: BenchmarkColumn[];
  models: BenchmarkModel[];
};

export type BenchmarkLinks = {
  paper?: string;
  github?: string;
  huggingface?: string;
};

export type BenchmarkData = {
  slug: string;
  name: string;
  tagline: string;
  abstract: string;
  citation?: string;
  authors?: BenchmarkAuthor[];
  lastUpdated: string;
  metrics: BenchmarkMetric[];
  links?: BenchmarkLinks;
  columns?: BenchmarkColumn[];
  models?: BenchmarkModel[];
  leaderboards?: BenchmarkLeaderboard[];
  notes: string[];
};
