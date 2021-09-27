export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: number;
  roleId: number;
}

export interface IRole {
  id: number;
  name: string;
  displayName: string;
}
