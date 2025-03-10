export type NewTitleType = {
  authorId: string;
  title: string;
};

export type UpdateTitleType = {
  id: string;
  authorId: string;
  title: string;
};

export type NewPost = {
  authorId: string;
  titleId: string;
  prompt: string;
  response: string;
};

export type UpdatePost = {
  id: string;
  authorId: string;
  titleId: string;
  prompt?: string;
  response?: string;
};

export type PostInclude = {
  author?: boolean;
};
