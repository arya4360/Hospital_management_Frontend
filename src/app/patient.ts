export class Patient{

  constructor(
    public username: string,
    public email: string,
    public password: string,
    public firstName: any,
    public lastName: string,
    public city: string,
    public state: string,
    public country: string,
    public contactNumber: string,
    public dob: any
  ) {
  }
}
