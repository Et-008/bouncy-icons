import React, { useState } from "react";
import Icons from "./components/Icons";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const filteredIcons = Icons.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (name: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedName(name);

    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1>My Custom Icon Library</h1>
        <p>Click any icon card to copy its React code component snippet.</p>
        <input
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.75rem",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "1rem",
        }}
      >
        {filteredIcons.map(({ name, component, code }) => {
          const Component = component as React.ComponentType<any>;

          return (
            <button
              key={name}
              onClick={() => handleCopy(name, code)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                  color: "#334155",
                }}
              >
                <Component />
              </div>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#64748b",
                }}
              >
                {name}
              </span>

              {copiedName === name && (
                <div
                  style={{
                    position: "absolute",
                    top: "5px",
                    background: "#22c55e",
                    color: "#fff",
                    fontSize: "0.7rem",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  Copied Snippet!
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
