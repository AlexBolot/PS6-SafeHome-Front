export class User {
  idUser: number;
  username: string;
  password: string;
  admin: boolean;
  email: string;

  constructor(User: any = {}) {
    this.idUser = User.idUser;
    this.username = User.username;
    this.password = User.password;
    this.admin = User.admin;
    this.email = User.email;
    this.token = User.token;
  }

  token: string;
}
