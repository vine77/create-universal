import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export function gitVersion() {
  try {
    const version = execSync('git --version', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    })

    return version.replace('git version ', '').trim()
  } catch {
    return null
  }
}

export function updatePackageScripts(scripts: { [key: string]: string }): void {
  const packageJsonPath = resolve(process.cwd(), './package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  packageJson.scripts = scripts
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

export function removePackageProperty(property: string): void {
  const packageJsonPath = resolve(process.cwd(), './package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  delete packageJson[property]
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}
