import { Navigate, Route, Routes } from "react-router-dom";
import { SiteShell } from "./components/SiteShell";
import { BenchmarkPage } from "./pages/BenchmarkPage";

export default function App() {
  return (
    <SiteShell>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/cardbiomedbench" replace />}
        />
        <Route
          path="/cardbiomedbench"
          element={<BenchmarkPage dataPath="/data/cardbiomedbench.json" />}
        />
        <Route
          path="/biomedsql"
          element={<BenchmarkPage dataPath="/data/biomedsql.json" />}
        />
      </Routes>
    </SiteShell>
  );
}
