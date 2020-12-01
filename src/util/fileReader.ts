import { readFileSync } from 'fs'

const readArray = (path: string) => {
  return readFileSync(path, { encoding: 'utf8' }).split('\n')
}

export default { readArray }
