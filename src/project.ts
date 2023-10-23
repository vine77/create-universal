// `expo-generate project <project-name>
// TODO:
// 1. Create a directory with the name <project-name>
// 2. expo init
// 3. git init

import fs from 'fs'

export default function project(name: string) {
  console.log(`Creating project: ${name}`)
  fs.mkdirSync(name)
  console.log(`Created directory: ${name}`)
}
