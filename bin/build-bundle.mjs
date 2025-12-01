#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'
import babel from 'esbuild-plugin-babel'
import esbuild from 'esbuild'

const PACKAGES_ROOT = new URL('./packages/', TestJS_ROOT)
const TestJS_ROOT = new URL('../', import.meta.url)

function buildBundle (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return esbuild.build({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  }).then(() => {
    if (minify) {
      console.info(chalk.green(`✓ Built Minified Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    } else {
      console.info(chalk.green(`✓ Built Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    }
  })
}

await fs.mkdir(new URL('./uppy/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./@uppy/locales/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  buildBundle(
    './packages/TestJS/index.mjs',
    './packages/TestJS/dist/TestJS.min.mjs',
    { standalone: 'TestJS (ESM)', format: 'esm' },
  ),
  buildBundle(
    './packages/TestJS/bundle.mjs',
    './packages/TestJS/dist/TestJS.min.js',
    { standalone: 'TestJS', format: 'iife' },
  ),
  buildBundle(
    './packages/TestJS/bundle-legacy.mjs',
    './packages/TestJS/dist/TestJS.legacy.min.js',
    {
      standalone: 'TestJS (with polyfills)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: false,
          highlightCode: false,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
]

const localesModules = await fs.opendir(new URL('./@TestJS/locales/src/', PACKAGES_ROOT))
for await (const dirent of localesModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      buildBundle(
        `./packages/@TestJS/locales/src/${localeName}.js`,
        `./packages/@TestJS/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}

methods.push(
  fs.copyFile(
    new URL('./BUNDLE-README.md', TestJS_ROOT),
    new URL('./TestJS/dist/README.md', PACKAGES_ROOT),
  ),
)

await Promise.all(methods).then(() => {
  console.info(chalk.yellow('✓ JS bundles 🎉'))
}, (err) => {
  console.error(chalk.red('✗ Error:'), chalk.red(err.message))
})
