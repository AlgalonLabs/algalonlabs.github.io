import { existsSync, readFileSync } from "node:fs";

const requiredFiles = ["index.html", ".github/workflows/deploy.yml"];

const missingFiles = requiredFiles.filter((file) => !existsSync(file));

if (missingFiles.length > 0) {
  console.error(`Missing required files: ${missingFiles.join(", ")}`);
  process.exit(1);
}

const html = readFileSync("index.html", "utf8");

const assertions = [
  {
    check: html.includes(
      "<title>Algalon Labs | Tokyo Night Developer Tooling</title>",
    ),
    message: "Missing expected document title.",
  },
  {
    check: html.includes("Cardano observability"),
    message: "Home page should mention Cardano observability.",
  },
  {
    check: html.includes("https://github.com/AlgalonLabs"),
    message: "Home page should link to the AlgalonLabs GitHub org.",
  },
  {
    check: html.includes("Tokyo Night interfaces"),
    message: "Hero copy drifted from the intended theme.",
  },
];

for (const assertion of assertions) {
  if (!assertion.check) {
    console.error(assertion.message);
    process.exit(1);
  }
}

console.log("Static site checks passed.");
