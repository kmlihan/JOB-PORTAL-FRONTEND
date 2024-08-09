/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { UserDto } from '../models/user-dto';
export interface JobDto {
  address?: AddressDto;
  applicants?: Array<UserDto>;
  archived?: boolean;
  benefits?: Array<string>;
  companyId?: string;
  companyLogo?: string;
  companyName?: string;
  contractType?: 'Permanent' | 'Freelance' | 'FixedTerm' | 'Internship';
  createdDate?: string;
  description?: string;
  experience?: number;
  featured?: boolean;
  id?: string;
  jobType?: 'FULL_TIME' | 'PART_TIME';
  languages?: Array<string>;
  levelOfEducation?: 'Secondary_Education' | 'Specialisation' | 'Bachelor' | 'Master' | 'Doctorate';
  responsibilities?: Array<string>;
  salary?: number;
  skills?: Array<string>;
  title?: string;
  updatedDate?: string;
}
