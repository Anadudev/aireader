import { create } from "zustand";

type PostType = {
	id: string;
  title?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
  };
  createsAt: string;
  updatedAt: string;
  response: string;
  prompt: string;
};

type PostPayloadtype = {
	title: string,
	prompt: string,
	response: string,
}

type PostStoreType = {
  posts: PostType[];
  getPosts: (posts: PostType[]) => void;
  addPost: (post: PostType) => void;
  deletePost: (id: string) => void;
  updatePost: (id: string, data: PostPayloadtype) => void;
};

const postStore = create<PostStoreType>((set) => ({
  posts: [],
  getPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  updatePost: (id, data) =>
    set((state) => ({
	  posts: state.posts.map((post) =>
		post.id === id ? { ...post, ...data } : post
	  ),
	})),
}));

export default postStore;
