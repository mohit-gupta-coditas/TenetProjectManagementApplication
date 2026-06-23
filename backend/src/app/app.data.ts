export enum SUBSCRIPTION {
  HALF = 'half',
  FULL = 'full',
  BASIC = 'basic'
}

export enum GLOBAL_ROLE {
  SUPERADMIN = 'superAdmin',
  ADMIN = 'admin',
  MEMBER = 'member'
}

export const CREATION_ROLE = {
  superAdmin: GLOBAL_ROLE.ADMIN,
  admin: GLOBAL_ROLE.MEMBER,
  member: GLOBAL_ROLE.MEMBER
}