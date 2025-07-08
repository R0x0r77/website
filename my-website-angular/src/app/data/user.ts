class User {
  userId: number | undefined;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string | undefined;
  createdTimestamp: Date;
  modifiedTimestamp: Date;
  password?: string;

  public constructor(
    userId: number | undefined,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string | undefined,
    createdTimestamp: Date,
    modifiedTimestamp: Date,
    password?: string
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.createdTimestamp = createdTimestamp;
    this.modifiedTimestamp = modifiedTimestamp;
    this.password = password;
  }
}

export default User;
