import { Command } from '@commander-js/extra-typings'

export default function main() {
  const program = new Command()

  program.command('project <name>').action((name: string) => {
    console.log(`Creating project: ${name}`)
  })

  program
    .command('component <name>')
    .allowUnknownOption()
    .action((name: string) => {
      const argsIndex = process.argv.indexOf('component') + 2
      const otherArgs = process.argv.slice(argsIndex)
      const argsString = otherArgs.join(' ')
      console.log(`Creating component: ${name} with args: ${argsString}`)
    })

  program.parse(process.argv)
}

main()
