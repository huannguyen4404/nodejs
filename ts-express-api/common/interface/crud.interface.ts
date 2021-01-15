export interface CRUD {
  list: (limit: number, page: number) => Promise<any>,
  create: (resource: any) => Promise<any>,
  readById: (resourceId: any) => Promise<any>,
  updateById: (resourceId: any) => Promise<string>,
  patchById: (resourceId: any) => Promise<string>,
  deleteById: (resourceId: any) => Promise<string>,
}
