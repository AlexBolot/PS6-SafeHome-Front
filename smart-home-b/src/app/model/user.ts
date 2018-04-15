export class User {
  idUser: number;
  username: String;
  password: String;
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
