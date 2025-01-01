import { program } from '@commander-js/extra-typings'

import app from './app.js'
import { packageDescription, packageVersion } from './helpers.js'

export default async function main() {
  program
    .name('npm create universal')
    .version(packageVersion, '-v, --version')
    .description(packageDescription)

  program.command('app [name]').action(async (name) => {
    await app({ name })
  })

  await program.parseAsync(process.argv)
}
