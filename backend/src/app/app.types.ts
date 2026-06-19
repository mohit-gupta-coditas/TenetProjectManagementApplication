type GLOBAL_ROLE = 'superAdmin' | 'admin' | 'member';

export interface Payload{
  userId: string;
  companyId: string;
  globalRole: GLOBAL_ROLE,
  passwordVersion?: number
}