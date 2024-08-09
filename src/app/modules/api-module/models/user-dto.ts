/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { AttachmentDto } from '../models/attachment-dto';
import { ExperienceDto } from '../models/experience-dto';
import { QualificationDto } from '../models/qualification-dto';
export interface UserDto {
  address?: AddressDto;
  archived?: boolean;
  bio?: string;
  birthDate?: string;
  cv?: AttachmentDto;
  email?: string;
  experiences?: Array<ExperienceDto>;
  firstName?: string;
  githubUrl?: string;
  id?: string;
  languages?: Array<string>;
  lastName?: string;
  linkedinUrl?: string;
  nationality?: string;
  password?: string;
  phone?: string;
  profilePicture?: AttachmentDto;
  profileTitle?: string;
  qualifications?: Array<QualificationDto>;
  skills?: Array<string>;
  userType?: 'ADMIN' | 'USER' | 'COMPANY';
}
