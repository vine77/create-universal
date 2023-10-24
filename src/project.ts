import {
  ExecSyncOptionsWithStringEncoding,
  execSync as nodeExecSync,
} from 'child_process'

function execSync(
  command: string,
  options?: ExecSyncOptionsWithStringEncoding,
) {
  return nodeExecSync(command, { encoding: 'utf8', ...options })
}

export default function project({ name }: { name: string }) {
  console.log(`Creating project in ${name}...`)
  execSync(`npm x --yes -- create-expo@latest --yes --template tabs ${name}`)
  console.log(`Project created in ${name}! 🎉 Run:`)
  console.log(`cd ${name} && npm start`)
}
