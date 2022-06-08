import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const buildConfig = (config) => {
  const build = ({ minified }) => ({
    input: "src/index.ts",
    ...config,
    output: {
      ...config.output,
      file: `${config.output.file}.${minified ? "min.js" : "js"}`,
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: false,
        tsconfigDefaults: require("./tsconfig.json"),
      }),
      json(),
      resolve(),
      commonjs(),
      minified && terser(),
      ...(config.plugins || []),
    ],
  });

  return [build({ minified: false }), build({ minified: true })];
};

export default async () => {
  const outputFileName = "wemixSDK";
  const name = "wemixSDK";

  return [
    ...buildConfig({
      output: {
        file: `dist/${outputFileName}`,
        name: name,
        format: "umd",
        exports: "default",
      },
    }),

    ...buildConfig({
      output: {
        file: `dist/esm/${outputFileName}`,
        format: "esm",
        preferConst: true,
        exports: "named",
      },
    }),
  ];
};
