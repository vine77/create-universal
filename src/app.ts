import {
  ExecSyncOptionsWithStringEncoding,
  execSync as nodeExecSync,
} from 'child_process'
import { cpSync, mkdirSync, renameSync, rmSync } from 'fs'
import { dirname, resolve } from 'path'
import { chdir, exit } from 'process'
import { fileURLToPath } from 'url'

import cuconfig from './cuconfig.json' assert { type: 'json' }
import { removePackageProperty, updatePackageScripts } from './helpers.js'

const { dependencies, devDependencies, scripts } = cuconfig

function log(message: string) {
  console.log(`⚙️ ${message}`)
}

function success(message: string) {
  console.log(`✅ ${message}`)
}

function error(message: string) {
  console.error(`❌ ${message}`)
}

function execSync(
  command: string,
  options?: ExecSyncOptionsWithStringEncoding,
) {
  console.log(`🖥️ Running command: ${command}`)

  return nodeExecSync(command, {
    encoding: 'utf8',
    stdio: 'inherit',
    ...options,
  })
}

export default function project({ name }: { name: string }) {
  log(`Creating project in ${name}...`)

  // Create new project with expo `tabs` template
  try {
    execSync(`npm create -y expo -- -y --template tabs ${name}`)
    // Change directory to new project for remaining steps
    chdir(`./${name}`)
  } catch {
    error('The project could not be created.')
    exit(1)
  }

  success('The base template was created.')

  log('Customizing base template...')

  // Add `src` folder and remove extra folders from expo `tabs` template
  try {
    rmSync('./app', { recursive: true, force: true })
    rmSync('./components', { recursive: true, force: true })
    rmSync('./constants', { recursive: true, force: true })
    mkdirSync('./src')
  } catch {
    console.error('An error occurred while configuring the project.')
    exit(1)
  }

  success('The base template was customized.')

  log('Updating package.json...')

  // Add `scripts` from cuconfig.json
  try {
    updatePackageScripts(scripts)
    removePackageProperty('jest')
  } catch {
    console.error('An error occurred while updating package.json.')
    exit(1)
  }

  success('package.json was updated.')

  log('Installing dependencies...')

  // Install dependencies
  try {
    execSync(`npm x -y -- expo install ${dependencies.join(' ')}`)
  } catch {
    console.error('An error occurred while installing dependencies.')
    exit(1)
  }

  // Install dev dependencies
  try {
    execSync(
      `npm x -y -- expo install ${devDependencies.join(' ')} -- --save-dev`,
    )
  } catch {
    console.error('An error occurred while installing dev dependencies.')
    exit(1)
  }

  success('Dependencies were installed.')

  log('Customizing theme...')

  // Eject gluestack to allow customizing theme
  try {
    execSync('npm x -y -- gluestack-ui-scripts eject-theme')
  } catch {
    // Swallow non-zero exit code
  }

  // Move gluestack config folder to src/components
  try {
    renameSync('./config', './src/components')
  } catch {
    console.error('An error occurred while configuring the theme.')
    exit(1)
  }

  success('Theme was customized.')

  log('Copying template files...')

  // Overlay template files
  try {
    const templatePath = resolve(
      dirname(fileURLToPath(import.meta.url)),
      'template',
    )
    cpSync(templatePath, process.cwd(), { recursive: true, force: true })
  } catch {
    console.error('An error occurred while copying template files.')
    exit(1)
  }

  success('Template files were copied.')

  log('Formatting files...')

  // Format files
  try {
    execSync('npm run format')
  } catch {
    console.error('An error occurred while formatting files.')
    exit(1)
  }

  success('Files were formatted.')

  // TODO: Add git commit

  console.log(`\n🎉 Project created in ${name}! Run:`)
  console.log(`cd ${name} && npm start`)
}
