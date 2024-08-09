/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { AttachmentDto } from '../models/attachment-dto';
import { JobDto } from '../models/job-dto';
export interface CompanyDto {
  address?: AddressDto;
  description?: string;
  email?: string;
  id?: string;
  jobs?: Array<JobDto>;
  logo?: AttachmentDto;
  name?: string;
  password?: string;
  userType?: 'ADMIN' | 'USER' | 'COMPANY';
  websiteUrl?: string;
}
