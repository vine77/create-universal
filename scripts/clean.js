import { rmSync } from 'fs'

function removeDistDirectory() {
  rmSync('dist', { force: true, recursive: true })
}

removeDistDirectory()
