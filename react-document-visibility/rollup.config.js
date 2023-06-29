import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const isDev = process.env.NODE_ENV === 'development';

const commonPlugins = [
    resolve(),
    commonjs(),
    typescript(),
    babel({
        exclude: 'node_modules/**',
        presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            '@babel/preset-react',
        ],
    }),
];

const cjsPlugins = [
    ...commonPlugins,
];

const esmPlugins = [
    ...commonPlugins,
];

if (!isDev) {
    cjsPlugins.push(terser());
    esmPlugins.push(terser());
}

/**
 * Rollup configuration
 * @type {import('rollup').RollupOptions}
 */
const cjsConfig = {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/cjs/index.js',
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
    ],
    external: ['react'],
    plugins: cjsPlugins,
};

/**
 * Rollup configuration
 * @type {import('rollup').RollupOptions}
 */
const esmConfig = {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/esm/index.esm.js',
            format: 'esm',
            exports: 'named',
            sourcemap: true,
        },
    ],
    external: ['react'],
    plugins: esmPlugins,
};

export default [cjsConfig, esmConfig];