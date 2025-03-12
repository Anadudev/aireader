import { PostType } from "@/types/Post.type";
import { QueryType } from '@/types/Query.type';


export type PostQueryType = QueryType & {
  title?: boolean;
};

export type TitlePayloadType = {
  title: string;
};

export type TitleType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  posts?: PostType[];
};

export type TitleStoreType = {
  titleGetLoading: boolean;
  titleUpdateLoading: boolean;
  titleCreateLoading: boolean;
  titleDeleteLoading: boolean;
  titles: TitleType[];
  handleTitleGet: () => void;
  handleTitleCreate: (titlePayload: TitlePayloadType) => void;
  handleTitleDelete: (id: string) => void;
  handleTitleUpdate: (id: string, titlePayload: TitlePayloadType) => void;
};
