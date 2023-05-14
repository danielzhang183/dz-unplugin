import { toRollupPlugin } from '../rollup'
import type { UnpluginContextMeta, UnpluginFactory, UnpluginInstance, VitePlugin } from '../types'
import { toArray } from '../utils'

export function getVitePlugin<UserOptions = {}, Nested extends boolean = boolean>(
  factory: UnpluginFactory<UserOptions, Nested>,
) {
  return ((userOptions?: UserOptions) => {
    const meta: UnpluginContextMeta = {
      framework: 'vite',
    }
    const rawPlugins = toArray(factory(userOptions!, meta))

    const plugins = rawPlugins.map((_plugin) => {
      const plugin = toRollupPlugin(_plugin, false) as VitePlugin
      if (_plugin.vite)
        Object.assign(plugin, _plugin.vite)

      return plugin
    })

    return plugins.length === 1 ? plugins[0] : plugins
  }) as UnpluginInstance<UserOptions, Nested>['vite']
}
