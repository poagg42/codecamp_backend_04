export interface IUser {
  user: {
    email: string;
    _code: string;
  };
}

export interface IContext {
  req?: Request & IUser;
  res?: Response;
}
