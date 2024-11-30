import { Command } from '@commander-js/extra-typings'

import app from './app.js'
import { packageDescription, packageVersion } from './helpers.js'

export default async function main() {
  const program = new Command()

  program
    .name('npm create universal')
    .version(packageVersion, '-v, --version')
    .description(packageDescription)

  program
    .command('app [name]')
    .option('--gluestack', 'Include gluestack-ui and components')
    .action((name, options) => {
      app({ name, options })
    })

  await program.parseAsync(process.argv)
}
