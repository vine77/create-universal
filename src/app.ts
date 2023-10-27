import {
  ExecSyncOptionsWithStringEncoding,
  execSync as nodeExecSync,
} from 'child_process'
import { mkdirSync, renameSync, rmSync } from 'fs'
import { chdir } from 'process'

import cuconfig from './cuconfig.json' assert { type: 'json' }
import { removePackageProperty, updatePackageScripts } from './helpers'

const { dependencies, devDependencies, scripts } = cuconfig

function execSync(
  command: string,
  options?: ExecSyncOptionsWithStringEncoding,
) {
  return nodeExecSync(command, {
    encoding: 'utf8',
    stdio: 'inherit',
    ...options,
  })
}

export default function project({ name }: { name: string }) {
  console.log(`Creating project in ${name}...`)

  // Create new project with expo `tabs` template
  try {
    execSync(`npm create -y expo -- -y --template tabs ${name}`)
    chdir(`./${name}`)
  } catch {
    console.error('The project could not be created.')
    process.exit(1)
  }

  // Add `src` folder and remove extra folders from expo `tabs` template
  try {
    rmSync('./app', { recursive: true, force: true })
    rmSync('./components', { recursive: true, force: true })
    rmSync('./constants', { recursive: true, force: true })
    mkdirSync('./src')
  } catch {
    console.error('An error occurred while configuring the project.')
    process.exit(1)
  }

  // Add `scripts` from cuconfig.json
  try {
    updatePackageScripts(scripts)
    removePackageProperty('jest')
  } catch {
    console.error('An error occurred while updating package.json.')
    process.exit(1)
  }

  // Install dependencies
  try {
    execSync(`npm x -y -- expo install ${dependencies.join(' ')}`)
  } catch {
    console.error('An error occurred while installing dependencies.')
    process.exit(1)
  }

  // Install dev dependencies
  try {
    execSync(`npm x -y -- expo install ${devDependencies.join(' ')} -- --dev`)
  } catch {
    console.error('An error occurred while installing dev dependencies.')
    process.exit(1)
  }

  // Eject gluestack-ui to allow customizing theme
  try {
    execSync('npm x -y -- gluestack-ui-scripts eject-theme')
    renameSync('./config', './src/components')
  } catch {
    console.error('An error occurred while configuring the theme.')
    process.exit(1)
  }

  // Format files
  try {
    execSync('npm run format')
  } catch {
    console.error('An error occurred while formatting files.')
    process.exit(1)
  }

  console.log(`Project created in ${name}! 🎉 Run:`)
  console.log(`cd ${name} && npm start`)
}
