export interface ICRUD {
  list: (limit: number, page: number) => Promise<any>
  create: (resource: Record<string, unknown>) => Promise<string>
  readById: (resourceId: string) => Promise<any>
  updateById: (resource: any) => Promise<void>
  deleteById: (resourceId: string) => Promise<void>
}
