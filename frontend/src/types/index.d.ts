declare type AuthorQueryType = QueryType & {
  title?: boolean;
  id?: string;
  username?: string;
  skip?: number;
  take?: number;
};

declare type AuthorIncludeType = {
  titles?: boolean;
  posts?: boolean;
};

declare type AuthorStoreType = {
  authorGetLoading: boolean;
  authorUpdateLoading: boolean;
  authors: UserType[];
  author: UserType | null;
  handleAuthorsGet: (query?: AuthorQueryType) => Promise<void>;
  handleAuthorGet: (
    include: AuthorIncludeType,
    username?: string,
    authorId?: string
  ) => Promise<void>;
};

declare type AuthStore = {
  authUser: UserType | null;
  loadingSignUp: boolean;
  loadingLogin: boolean;
  loginHandler: (data: { username: string; password: string }) => Promise<void>;
  signupHandler: (data: {
    username: string;
    password: string;
  }) => Promise<void>;
  logoutHandler: () => void;
  logoutLoading: boolean;
  authUserHandler: () => Promise<void>;
};

declare type FeatureType = {
  title: string;
  description: string;
  Icon: LucideIcon;
};
declare type PostQueryType = QueryType & {
  title?: boolean;
  titleId?: string;
  authorId?: string;
};

declare type PostType = {
  id: string;
  title?: TitleType | null;
  createsAt: string;
  updatedAt: string;
  response: string;
  prompt: string;
};

declare type ChatPayload = { id: string; prompt: string; response: string };

declare type PostPayloadType = {
  titleId: string;
  chats: { prompt?: string; response?: string }[];
};

declare type PostStoreType = {
  postGetLoading: boolean;
  postUpdateLoading: boolean;
  postCreateLoading: boolean;
  postDeleteLoading: boolean;
  posts: PostType[];
  handlePostsGet: (query?: PostQueryType) => Promise<void>;
  handlePostCreate: (postPayload: PostPayloadType) => Promise<void>;
  handlePostDelete: (id: string) => Promise<void>;
  handlePostUpdate: (postPayload: ChatPayload) => Promise<void>;
};

declare type QueryType = {
  take?: number;
  skip?: number;
  search?: string;
};

declare type TestimonialType = {
  testimony: string;
  username: string;
  avatar: string;
};

declare type PaginationType = {
  take: number;
  skip?: number;
};

declare type TitleQueryType = QueryType & {
  posts?: boolean;
};

declare type TitlePayloadType = {
  id: string;
  title: string;
};

declare type TitleType = {
  id: string;
  authorId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  author?: UserType;
  posts?: PostType[];
};

declare type TitleIncludeType = {
  author?: boolean;
  posts?: boolean;
};

declare type TitleStoreType = {
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

export type UserType = {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  titles?: TitleType[];
  posts?: PostType[];
};
