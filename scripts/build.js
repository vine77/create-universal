import { cpSync } from 'fs'

function copyTemplateDirectory() {
  cpSync('template', 'dist/template', { recursive: true })
}

copyTemplateDirectory()
