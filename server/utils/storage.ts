import { defineDriver } from 'unstorage'
import { existsSync, promises as fsp, Stats } from 'node:fs'
import { resolve, join } from 'node:path'

export const getStorage = () => {
  const get = async <T>(key: string): Promise<T | undefined> => {
    const path = resolve(`./data/${key}.json`)

    if (!existsSync(path)) {
      fsp.writeFile(path, '[]')
    }

    const data = await fsp.readFile(path, 'utf-8')

    return JSON.parse(data)
  }

  const set = async <T>(key: string, value: T) => {
    const path = resolve(`./data/${key}.json`)

    await fsp.writeFile(path, JSON.stringify(value, null, 2))

    return true
  }

  return {
    get,
    set
  }
}
