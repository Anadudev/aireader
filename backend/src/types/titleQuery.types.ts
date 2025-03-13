import { QueryType } from './query.types';

type IncludeFlags = {
  author?: boolean;
  posts?: boolean;
};

export type TitleIncludeType = IncludeFlags;

export type TitleQueryType = QueryType & IncludeFlags;
