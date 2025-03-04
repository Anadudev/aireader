export type NewUser = {
  username: string;
  password: string;
};
export type UpdateUser = {
  username?: string;
  password?: string;
};

export type Include = {
  posts?: boolean;
  accounts?: boolean;
};
