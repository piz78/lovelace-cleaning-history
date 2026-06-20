import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/cleaning-history-card.ts",
  output: {
    file: "cleaning-history-card.js",
    format: "iife",
    name: "CleaningHistoryCard",
  },
  plugins: [resolve(), commonjs(), typescript(), terser()],
};
