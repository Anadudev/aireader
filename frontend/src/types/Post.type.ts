import { TitleType } from "@/types/Title.type";
import { QueryType } from "@/types/Query.type";

export type PostQueryType = QueryType & {
  title?: boolean;
  titleId?: string;
  authorId?: string;
};

export type PostType = {
  id: string;
  title?: TitleType | null;
  createsAt: string;
  updatedAt: string;
  response: string;
  prompt: string;
};

export type ChatPayload = { id: string; prompt: string; response: string };

export type PostPayloadType = {
  titleId: string;
  chats: { prompt?: string; response?: string }[];
};

export type PostStoreType = {
  postGetLoading: boolean;
  postUpdateLoading: boolean;
  postCreateLoading: boolean;
  postDeleteLoading: boolean;
  posts: PostType[];
  handlePostsGet: (query?: PostQueryType) => void;
  handlePostCreate: (postPayload: PostPayloadType) => void;
  handlePostDelete: (id: string) => void;
  handlePostUpdate: (postPayload: ChatPayload) => void;
};
