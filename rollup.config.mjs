import typescript from '@rollup/plugin-typescript';

const devMode = process.env.NODE_ENV === 'development';
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: devMode ? 'inline' : false,
    },
    plugins: [typescript()],
  },
];
