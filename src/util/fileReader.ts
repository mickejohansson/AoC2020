import { readFileSync } from 'fs'

const readStringArray = (path: string) => {
  return readFileSync(path, { encoding: 'utf8' }).trim().split('\n')
}

const readIntArray = (path: string) => {
  return readFileSync(path, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .map((s) => parseInt(s))
}

export default { readStringArray, readIntArray }
