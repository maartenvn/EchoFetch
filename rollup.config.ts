import commonjs from "rollup-plugin-commonjs"
import sourceMaps from "rollup-plugin-sourcemaps"
import typescript from "rollup-plugin-typescript2"

const pkg = require("./package.json")

export default {
    input: `src/index.ts`,
    output: [
        {file: pkg.main, name: pkg.name.toLowerCase(), format: 'umd', sourcemap: true},
        {file: pkg.module, format: 'es', sourcemap: true},
    ],
    watch: {
        include: 'src/**',
    },
    plugins: [
        // Compile TypeScript files
        typescript({useTsconfigDeclarationDir: true}),

        // Allow bundling cjs modules
        commonjs(),

        // Resolve source maps to the original source
        sourceMaps(),
    ],
}