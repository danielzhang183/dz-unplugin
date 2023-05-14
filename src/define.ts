import { getRollupPlugin } from './rollup'
import type { UnpluginFactory, UnpluginInstance } from './types'
import { getVitePlugin } from './vite'

export function createUnplugin<UserOptions, Nested extends boolean = boolean>(
  factory: UnpluginFactory<UserOptions, Nested>,
): UnpluginInstance<UserOptions, Nested> {
  return {
    get rollup() {
      return getRollupPlugin(factory)
    },
    get vite() {
      return getVitePlugin(factory)
    },
  }
}
