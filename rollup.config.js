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
        useTsconfigDeclarationDir: false, // 선언 파일을 위치를 tsconfig에서 지정하는 것이 아니라 롤업 구성에 위치
        tsconfig: "tsconfig.json", // tsconfig 파일 명시
      }),
      json(), // json 파일 불러오기
      resolve(), // 서드파티(외부) 모듈 사용 가능, ts/tsx파일도 불러올 수 있음
      commonjs(), // commonjs 모듈을 es모듈로 변환
      minified && terser(), // 파일 최소화 (.min.js 생성)
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
        name: name, // global name
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
