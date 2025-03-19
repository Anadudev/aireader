export type NewUser = {
  username: string;
  password: string;
};
export type UpdateUser = {
  username?: string;
  password?: string;
};

export type UserInclude = {
  posts?: boolean;
  titles?: boolean;
  accounts?: boolean;
};
