import type { PluginContextMeta as RollupContextMeta, SourceMapInput } from 'rollup'
import { Plugin as RollupPlugin } from 'rollup'
import type { Plugin as VitePlugin } from 'vite'

export {
  RollupPlugin,
  VitePlugin,
}

export type Thenable<T> = T | Promise<T>

export interface SourceMapCompact {
  file?: string
  mappings: string
  names: string[]
  sourceRoot?: string
  sources: string[]
  // In magic-string v0.27.0, `sourcesContent` becomes nullable, while rollup haven't catch up yet
  sourcesContent?: (string | null)[]
  version: number
}

export type TransformResult = string | { code: string; map?: SourceMapInput | SourceMapCompact | null } | null | undefined

export interface ExternalIdResult { id: string; external?: boolean }

export type UnpluginFactory<UserOptions, Nested extends boolean = boolean> = (options: UserOptions, meta: UnpluginContextMeta) =>
Nested extends true
  ? Array<UnpluginOptions>
  : UnpluginOptions
export type UnpluginFactoryOutput<UserOptions, Return> = undefined extends UserOptions
  ? (options?: UserOptions) => Return
  : (options: UserOptions) => Return

export interface UnpluginInstance<UserOptions, Nested extends boolean = boolean> {
  rollup: UnpluginFactoryOutput<UserOptions, Nested extends true ? Array<RollupPlugin> : RollupPlugin>
  vite: UnpluginFactoryOutput<UserOptions, Nested extends true ? Array<VitePlugin> : VitePlugin>
}

export type UnpluginContextMeta = Partial<RollupContextMeta> & ({
  framework: 'rollup' | 'vite'
})

export interface UnpluginOptions {
  name: string
  enforce?: 'post' | 'pre' | undefined

  // Build Hooks
  buildStart?: () => Promise<void> | void
  buildEnd?: () => Promise<void> | void
  transform?: (code: string, id: string) => Thenable<TransformResult>
  load?: (id: string) => Thenable<TransformResult>
  resolveId?: (id: string, importer: string | undefined, options: { isEntry: boolean }) => Thenable<string | ExternalIdResult | null | undefined>
  watchChange?: (id: string, change: { event: 'create' | 'update' | 'delete' }) => void

  /**
   * Custom predicate function to filter modules to be loaded.
   * When omitted, all modules will be included (might have potential perf impact on Webpack).
   */
  loadInclude?: (id: string) => boolean | null | undefined
  /**
    * Custom predicate function to filter modules to be transformed.
    * When omitted, all modules will be included (might have potential perf impact on Webpack).
    */
  transformInclude?: (id: string) => boolean | null | undefined

  // Framework specify extends
  rollup?: Partial<RollupPlugin>
  vite?: Partial<VitePlugin>
}
