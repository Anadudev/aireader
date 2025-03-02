export interface NewPost {
  userId: string;
  title: string | null;
  prompt: string;
  response: string;
}

export interface UpdatePost {
  id: string;
  userId: string;
  title?: string;
  content?: string;
  authorId?: string;
}
