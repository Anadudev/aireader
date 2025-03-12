import { QueryType } from './query.types';

export type TitleQueryType = QueryType & {
  posts?: boolean;
};
