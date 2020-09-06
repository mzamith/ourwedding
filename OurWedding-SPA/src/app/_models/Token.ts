export interface Token {
  exp: Date;
  iat: Date;
  nameid: number;
  nbf: Date;
  role: Array<string>;
  unique_name: string;
}
