import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

// @ts-ignore: Ignore that this is outside rootDir (since it'll exist in build)
import packageJson from '../package.json' with { type: 'json' }

export const packageVersion = packageJson.version
export const packageName = packageJson.name
export const packageDescription = packageJson.description

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
  packageJson.scripts = { ...packageJson.scripts, ...scripts }
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

export function removePackageProperty(property: string): void {
  const packageJsonPath = resolve(process.cwd(), './package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  const keys = property.split('.')
  let current = packageJson
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined) return
    current = current[keys[i]]
  }
  delete current[keys[keys.length - 1]]
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}
