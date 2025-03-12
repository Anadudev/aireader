import { QueryType } from './query.types';

export type PostQueryType = QueryType & {
  title?: string;
};
