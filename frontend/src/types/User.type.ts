import { TitleType } from "@/types/Title.type";
import { PostType } from "@/types/Post.type";

export type UserType = {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  titles?: TitleType[];
  posts?: PostType[];
};
