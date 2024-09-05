import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: './dist/esm',
  format: ['esm'],
  dts: true,
  sourcemap: true,
  tsconfig: 'tsconfig.json',
})
