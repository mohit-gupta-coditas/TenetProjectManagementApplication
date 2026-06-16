export interface Payload{
  userId: string;
  companyId: string;
  globalRole: 'superAdmin' | 'admin' | 'member'
}