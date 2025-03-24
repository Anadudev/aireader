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
