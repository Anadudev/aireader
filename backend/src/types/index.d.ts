import { Request } from 'express';
import { User } from '@prisma/client';

declare type ExtendedRequest = Request & {
  user?: User;
};

declare type NewTitleType = {
  slug: string;
  authorId: string;
  title: string;
};

declare type UpdateTitleType = {
  authorId: string;
  title: string;
  slug?: string;
  id: string;
};

declare type NewPost = {
  authorId: string;
  titleId: string;
  prompt: string;
  response: string;
};

declare type UpdatePost = {
  id: string;
  authorId: string;
  titleId: string;
  prompt?: string;
  response?: string;
};

declare type PostInclude = {
  author?: boolean;
};

declare type PostWhereType = {
  id?: string;
  titleId?: string;
  authorId?: string;
};

declare type PostQueryType = QueryType & {
  title?: boolean;
  titleId?: string;
  authorId?: string;
};
declare type QueryType = {
  take?: number;
  skip?: number;
  search?: string;
};

declare type IncludeFlags = {
  author?: boolean;
  posts?: boolean;
};

declare type TitleIncludeType = IncludeFlags;

declare type TitleQueryType = QueryType & IncludeFlags;

declare type NewUser = {
  username: string;
  password: string;
};
declare type UpdateUser = {
  username?: string;
  password?: string;
};

declare type UserInclude = {
  posts?: boolean;
  titles?: boolean;
  accounts?: boolean;
};
