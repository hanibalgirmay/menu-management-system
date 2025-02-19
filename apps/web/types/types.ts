export interface MenuNode {
  id: string;
  name: string;
}

export interface CreateMenuPayload {
  name: string;
  parentId?: string;
}
