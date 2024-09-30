export type IUser = {
  name?: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
};

export type sessionProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};
