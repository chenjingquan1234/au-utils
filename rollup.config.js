/**
 * https://www.rollupjs.com/configuration-options/
 */

// const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const json = require("@rollup/plugin-json");

module.exports = [
  {
    input: "./packages/index.ts",
    output: [
      {
        dir: "lib",
        format: "cjs",
        entryFileNames: "[name].cjs.js",
        sourcemap: false, // 是否输出sourcemap
      },
      {
        dir: "lib",
        format: "esm",
        entryFileNames: "[name].esm.js",
        sourcemap: false, // 是否输出sourcemap
      },
      {
        dir: "lib",
        format: "umd",
        entryFileNames: "[name].umd.js",
        name: "$utils", // umd 模块名称，相当于一个命名空间，会自动挂载到window下面
        sourcemap: false,
        plugins: [terser()],
      },
      {
        file: "public/bundle.js",
        name: "myBundle",
        format: "umd",
        globals: {
          lodash: "_",
          "./utils/math": "util",
        },
      },
    ],
    plugins: [
      // resolve(),
      json(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          incremental: false,
        },
      }),
    ],
  },
];
