import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'index.js',
  moduleName: 'dotbars',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({ include: 'node_modules/**' }),
  ],
  targets: [
    { dest: 'dist/dotbars.cjs.js', format: 'cjs' }
  ]
};
