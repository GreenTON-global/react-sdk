import { Organization } from './Organization';

export interface Tree {
  id: number;
  organizationId: number;
  src: string;
  name: string;
  type: string;
  region: string;
  location: string;
  price: number;
  collectionAddress: string;
}

export interface TreeWithOrganization extends Tree {
  organization: Organization;
}
