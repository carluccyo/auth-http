import {IAuthConfig} from "./IAuthConfig";

export class AuthConfig {

  headerName: string;
  tokenName: string;
  tokenGetter: any;
  globalHeaders: Array<Object>;

  constructor(config:any={}) {
    this.headerName = config.headerName || 'Authorization';
    this.tokenName = config.tokenName || 'id_token';
    this.tokenGetter = config.tokenGetter || (() => localStorage.getItem(this.tokenName));
    this.globalHeaders = config.globalHeaders || [];
  }

  getConfig() : IAuthConfig {
    return {
      headerName: this.headerName,
      tokenName: this.tokenName,
      tokenGetter: this.tokenGetter,
      globalHeaders: this.globalHeaders
    }
  }

}
