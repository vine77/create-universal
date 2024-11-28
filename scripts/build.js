import { cpSync } from 'fs'
import { resolve } from 'path'

cpSync('template', resolve('dist', 'template'), { recursive: true })
cpSync('patches', resolve('dist', 'patches'), { recursive: true })
