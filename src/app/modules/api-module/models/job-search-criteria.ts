/* tslint:disable */
/* eslint-disable */
export interface JobSearchCriteria {
  city?: string;
  companyId?: string;
  contractType?: 'Permanent' | 'Freelance' | 'FixedTerm' | 'Internship';
  country?: string;
  description?: string;
  experience?: number;
  jobType?: 'FULL_TIME' | 'PART_TIME';
  languages?: Array<string>;
  levelOfEducation?: 'Secondary_Education' | 'Specialisation' | 'Bachelor' | 'Master' | 'Doctorate';
  salary?: number;
  skills?: Array<string>;
  title?: string;
}
