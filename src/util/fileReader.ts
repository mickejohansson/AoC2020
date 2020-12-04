import { readFileSync } from 'fs'

const readStringArray = (path: string, delimiter: string = '\n') => {
  return readFileSync(path, { encoding: 'utf8' }).trim().split(delimiter)
}

const readIntArray = (path: string) => {
  return readFileSync(path, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .map((s) => parseInt(s))
}

export default { readStringArray, readIntArray }
