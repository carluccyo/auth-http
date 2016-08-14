export interface IAuthConfig {
  tokenGetter: any;
  tokenName: string;
  headerName: string;
  globalHeaders: Array<Object>;
}
