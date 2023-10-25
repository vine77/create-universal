import {
  ExecSyncOptionsWithStringEncoding,
  execSync as nodeExecSync,
} from 'child_process'
import { mkdirSync, rmSync } from 'fs'
import { chdir } from 'process'

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

  try {
    execSync(`npm x --yes -- create-expo@latest --yes --template tabs ${name}`)
    chdir(`./${name}`)
  } catch {
    console.error('The project could not be created.')
    process.exit(1)
  }

  try {
    rmSync('./app', { recursive: true, force: true })
    rmSync('./components', { recursive: true, force: true })
    rmSync('./constants', { recursive: true, force: true })
  } catch {
    console.error('An error occurred while configuring the project.')
    process.exit(1)
  }

  console.log(`Project created in ${name}! 🎉 Run:`)
  console.log(`cd ${name} && npm start`)
}
