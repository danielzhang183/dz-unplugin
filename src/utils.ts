export type Nullable<T> = T | null | undefined
export type Arrayable<T> = T | Array<T>

export function toArray<T>(array?: Nullable<Arrayable<T>>) {
  array = array || []
  return Array.isArray(array) ? array : [array]
}
