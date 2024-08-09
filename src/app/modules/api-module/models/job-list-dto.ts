/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { UserDto } from '../models/user-dto';
export interface JobListDto {
  address?: AddressDto;
  applicants?: Array<UserDto>;
  companyId?: string;
  contractType?: 'Permanent' | 'Freelance' | 'FixedTerm' | 'Internship';
  description?: string;
  experience?: number;
  id?: string;
  jobType?: 'FULL_TIME' | 'PART_TIME';
  language?: string;
  levelOfEducation?: 'Secondary_Education' | 'Specialisation' | 'Bachelor' | 'Master' | 'Doctorate';
  maxSalary?: number;
  minSalary?: number;
  roles?: Array<string>;
  skills?: Array<string>;
  title?: string;
}
