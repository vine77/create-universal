#!/usr/bin/env node

// Suppress experimental warnings from output like:
// - ExperimentalWarning: Import assertions are not a stable feature...
// - ExperimentalWarning: Importing JSON modules is an experimental feature...
import 'suppress-experimental-warnings'

const main = (await import('./index.js')).default

main()
