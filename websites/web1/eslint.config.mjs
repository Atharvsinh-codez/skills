import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** eslint-config-next 16 ships flat config directly — no FlatCompat needed. */
const config = [
  { ignores: ['.next/**', 'node_modules/**', '.captures/**', 'next-env.d.ts'] },
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
