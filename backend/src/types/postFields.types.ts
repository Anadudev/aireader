export type NewPost = {
  // userId: string;
  title?: string;
  prompt: string;
  response: string;
};

export type UpdatePost = {
  id: string;
  userId: string;
  title?: string;
  content?: string;
  authorId?: string;
};

export type PostInclude = {
  author?: boolean;
};
