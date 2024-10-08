import {
  ExecSyncOptionsWithStringEncoding,
  execSync as nodeExecSync,
} from 'child_process'
import { cpSync, mkdirSync, rmSync } from 'fs'
import { dirname, resolve } from 'path'
import { chdir, exit, stdin, stdout } from 'process'
import { createInterface } from 'readline/promises'
import { fileURLToPath } from 'url'

import cuconfig from './cuconfig.json' assert { type: 'json' }
import {
  gitVersion,
  packageName,
  packageVersion,
  removePackageProperty,
  updatePackageScripts,
} from './helpers.js'

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
  return nodeExecSync(command, { stdio: 'inherit', ...options })
}

export default async function app({ name }: { name?: string } = {}) {
  const isYarn = process.env.npm_config_user_agent?.includes('yarn')
  let appName = name

  if (!name) {
    const rl = createInterface({ input: stdin, output: stdout })
    const answer = await rl.question(
      'What is the name of your app (directory name)? ',
    )
    rl.close()
    if (!answer) {
      error('The app name cannot be empty.')
      exit(1)
    }
    appName = answer
  }

  log(`Creating universal app in ${appName}...`)

  // Create new project with expo `tabs` template
  try {
    execSync(
      isYarn
        ? `yarn create -y expo -y ${appName}`
        : `npm create -y expo@latest -- ${appName}`,
    )
    // Change directory to new project for remaining steps
    chdir(`./${appName}`)
    // Run Expo's reset-project script then clean up
    execSync(isYarn ? 'yarn reset-project' : 'npm run reset-project')
    removePackageProperty('scripts.reset-project')
    rmSync('./scripts', { recursive: true, force: true })
    rmSync('./app-example', { recursive: true, force: true })
  } catch {
    error('The project could not be created.')
    exit(1)
  }

  success('The base template was created.')

  log('Customizing base template...')

  // Remove extra folders from expo template and add `src` folder
  try {
    rmSync('./hooks', { recursive: true, force: true })
    rmSync('./components', { recursive: true, force: true })
    rmSync('./constants', { recursive: true, force: true })
  } catch {
    console.error('An error occurred while configuring the project.')
    exit(1)
  }

  success('The base template was customized.')

  log('Updating package.json...')

  // Add config from cuconfig.json to package.json
  try {
    updatePackageScripts(scripts)
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
    execSync(`npm x -y -- expo install ${devDependencies.join(' ')} -- -D`)
  } catch {
    console.error('An error occurred while installing dev dependencies.')
    exit(1)
  }

  success('Dependencies were installed.')

  log('Installing gluestack...')

  try {
    execSync('npx gluestack-ui@latest init')
  } catch {
    console.error('An error occurred while installing gluestack.')
    exit(1)
  }

  success('Gluestack was installed.')

  log('Adding gluestack components...')

  // Add all available gluestack components
  try {
    execSync('npx gluestack-ui@latest add --all')
  } catch {
    console.error('An error occurred while adding gluestack components.')
    exit(1)
  }

  success('GlueStack components were added.')

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
    execSync(isYarn ? 'yarn format' : 'npm run format')
  } catch {
    console.error('An error occurred while formatting files.')
    exit(1)
  }

  success('Files were formatted.')

  try {
    const isGitInstalled = gitVersion() !== null

    if (isGitInstalled) {
      log('Committing to git...')
      execSync('git add .')
      execSync(
        `git commit -m "Initial commit from ${packageName}" -m "" -m "Generated by ${packageName} ${packageVersion}"`,
      )
      success('Added git commit.')
    }
  } catch {
    console.error('An error occurred while committing to git.')
    exit(1)
  }

  console.log(`\n🎉 Project created in ${appName}! Run:`)
  console.log(`cd ${appName} && ${isYarn ? 'yarn' : 'npm'} start`)
}
