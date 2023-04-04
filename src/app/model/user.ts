export class User {
  constructor(
    public expirationDate: Date,
    public roles: string[],
    public token: string,
    public type: string,
    public username: string,
  ){

  }
}
