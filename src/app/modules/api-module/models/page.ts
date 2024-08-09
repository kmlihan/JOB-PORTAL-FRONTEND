/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
export interface Page {
  content?: Array<{
}>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
