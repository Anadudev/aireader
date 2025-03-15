import { PostType } from "@/types/Post.type";
import { QueryType } from "@/types/Query.type";
import { UserType } from "@/types/User.type";

export type PaginationType = {
  take: number;
  skip?: number;
};

export type TitleQueryType = QueryType & {
  posts?: boolean;
};

export type TitlePayloadType = {
  id: string;
  title: string;
};

export type TitleType = {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  author?: UserType;
  posts?: PostType[];
};

export type TitleIncludeType = {
  author?: boolean;
  posts?: boolean;
};

export type TitleStoreType = {
  titleGetLoading: boolean;
  titleUpdateLoading: boolean;
  titleCreateLoading: boolean;
  titleDeleteLoading: boolean;
  titles: TitleType[];
  post: TitleType | null;
  handleTitlesGet: (queries?: TitleQueryType) => Promise<void>;
  handleTitleGet: (slug: string, include?: TitleIncludeType) => Promise<void>;
  handleTitleCreate: (titlePayload: {
    title: string;
  }) => Promise<TitleType | void>;
  handleTitleDelete: (id: string) => Promise<void>;
  handleTitleUpdate: (titlePayload: TitlePayloadType) => Promise<void>;
};
