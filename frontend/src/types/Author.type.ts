import { QueryType } from "@/types/Query.type";
import { UserType } from "@/types/User.type";

export type AuthorQueryType = QueryType & {
  title?: boolean;
  id?: string;
  username?: string;
  skip?: number;
  take?: number;
};

export type AuthorIncludeType = {
  titles?: boolean;
  posts?: boolean;
};

export type ChatPayload = { id: string; prompt: string; response: string };

export type AuthorStoreType = {
  authorGetLoading: boolean;
  authorUpdateLoading: boolean;
  authors: UserType[];
  author: UserType | null;
  handleAuthorsGet: (query?: AuthorQueryType) => Promise<void>;
  handleAuthorGet: (
    include: AuthorIncludeType,
    username?: string,
    authorId?: string
  ) => Promise<void>;
};
