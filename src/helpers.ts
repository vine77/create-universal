import { execSync } from 'child_process'

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
