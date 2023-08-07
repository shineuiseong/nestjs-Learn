import { EntityWhere } from './entity-where.type'

export type FindOptions<T> = {
  where: EntityWhere<T>[] | EntityWhere<T>
}
