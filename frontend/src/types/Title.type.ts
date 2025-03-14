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
  handleTitlesGet: (queries?: TitleQueryType) => void;
  handleTitleGet: (slug: string, include?: TitleIncludeType) => void;
  handleTitleCreate: (titlePayload: TitlePayloadType) => void;
  handleTitleDelete: (id: string) => void;
  handleTitleUpdate: (titlePayload: TitlePayloadType) => void;
};
