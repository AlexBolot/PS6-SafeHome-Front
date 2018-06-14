export class User {
  idUser: number;
  username: string;
  password: string;
  admin: boolean;
  email: string;

  constructor(user: any = {}) {
    this.idUser = user.idUser;
    this.username = user.username;
    this.password = user.password;
    this.admin = user.admin;
    this.email = user.email;
    this.token = user.token;
  }

  token: string;
}
