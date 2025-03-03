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
  accounts?: boolean;
};
