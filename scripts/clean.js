import { rmSync } from 'fs'

function removeDistDirectory() {
  rmSync('dist', { recursive: true, force: true })
}

removeDistDirectory()
