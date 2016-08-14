import {Injectable } from '@angular/core';
import {IAuthConfig} from './IAuthConfig';
import {AuthConfig} from './AuthConfig';
import {Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthHttp {

  private _config: IAuthConfig;
  public tokenStream: Observable<string>;

  constructor(options: AuthConfig, private http: Http, private _defOpts?: RequestOptions) {
    
    this._config = options.getConfig();

    this.tokenStream = new Observable<string>((obs: any) => {
      obs.next(this._config.tokenGetter());
    });

  }
  
  setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
    
    if ( ! request.headers ) {
      request.headers = new Headers();
    }

    headers.forEach((header: Object) => {
      let key: string = Object.keys(header)[0];
      let headerValue: string = (<any>header)[key];
      request.headers.set(key, headerValue);
    });

  }

  request(url: string | Request, options?: RequestOptionsArgs) : Observable<Response> {
    
    if (typeof url === 'string') {
      return this.get(url, options); // Recursion: transform url from String to Request
    }

    // else if ( ! url instanceof Request ) {
    //   throw new Error('First argument must be a url string or Request instance.');
    // }

    // from this point url is always an instance of Request;
    
    let req: Request = <Request>url;

    req.headers.set(this._config.headerName, this._config.tokenGetter());
    
    return this.http.request(req);

  }

  private mergeOptions(defaultOpts: RequestOptions, providedOpts: RequestOptionsArgs) {
    let newOptions = defaultOpts || new RequestOptions();

    if (this._config.globalHeaders) {
      this.setGlobalHeaders(this._config.globalHeaders, providedOpts);
    }
    
    newOptions = newOptions.merge(new RequestOptions(providedOpts));
    return newOptions;
  }


  private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions: RequestOptionsArgs) : Observable<Response> {
    let options = new RequestOptions(requestArgs);
    if (additionalOptions) {
      options = options.merge(additionalOptions);
    }
    return this.request(new Request(this.mergeOptions(this._defOpts, options)));
  }

  get(url: string, options?: RequestOptionsArgs) : Observable<Response> {
    return this.requestHelper({ url:  url, method: RequestMethod.Get }, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
    return this.requestHelper({ url:  url, body: body, method: RequestMethod.Post }, options);
  }

  put(url: string, body: any, options ?: RequestOptionsArgs) : Observable<Response> {
    return this.requestHelper({ url:  url, body: body, method: RequestMethod.Put }, options);
  }

  delete(url: string, options ?: RequestOptionsArgs) : Observable<Response> {
    return this.requestHelper({ url:  url, method: RequestMethod.Delete }, options);
  }

  patch(url: string, body:any, options?: RequestOptionsArgs) : Observable<Response> {
    return this.requestHelper({ url:  url, body: body, method: RequestMethod.Patch }, options);
  }

  head(url: string, options?: RequestOptionsArgs) : Observable<Response> {
    return this.requestHelper({ url:  url, method: RequestMethod.Head }, options);
  }

}
