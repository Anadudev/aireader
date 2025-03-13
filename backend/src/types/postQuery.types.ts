import { QueryType } from './query.types';

export type PostWhereType = {
  id?: string;
  titleId?: string;
  authorId?: string;
};

export type PostQueryType = QueryType & {
  title?: boolean;
  titleId?: string;
  authorId?: string;
};
