import { TitleType } from "@/types/Title.type";
import { QueryType } from '@/types/Query.type';


export type PostQueryType = QueryType & {
  title?: boolean;
};

export type PostType = {
  id: string;
  title?: TitleType | null;
  createsAt: string;
  updatedAt: string;
  response: string;
  prompt: string;
};

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
  handlePostGet: () => void;
  handlePostCreate: (postPayload: PostPayloadType) => void;
  handlePostDelete: (id: string) => void;
  handlePostUpdate: (id: string, postPayload: PostPayloadType[]) => void;
};
