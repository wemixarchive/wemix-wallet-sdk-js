import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// import resolve from '@rollup/plugin-node-resolve'
// import { terser } from 'rollup-plugin-terser'

export default {
  input: `src/index.ts`,
  output: [
    {
      file: `dist/index.cjs.js`,
      format: "cjs",
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: false,
      tsconfigDefaults: require("./tsconfig.json"),
    }),
    commonjs(),
    json(),
    // resolve(),
    // terser(),
  ],
  external: [],
};
