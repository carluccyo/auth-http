var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("auth-http/app/IAuthConfig", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("auth-http/app/AuthConfig", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var AuthConfig;
    return {
        setters:[],
        execute: function() {
            AuthConfig = (function () {
                function AuthConfig(config) {
                    var _this = this;
                    if (config === void 0) { config = {}; }
                    this.headerName = config.headerName || 'Authorization';
                    this.tokenName = config.tokenName || 'id_token';
                    this.tokenGetter = config.tokenGetter || (function () { return localStorage.getItem(_this.tokenName); });
                    this.globalHeaders = config.globalHeaders || [];
                }
                AuthConfig.prototype.getConfig = function () {
                    return {
                        headerName: this.headerName,
                        tokenName: this.tokenName,
                        tokenGetter: this.tokenGetter,
                        globalHeaders: this.globalHeaders
                    };
                };
                return AuthConfig;
            }());
            exports_2("AuthConfig", AuthConfig);
        }
    }
});
System.register("auth-http/app/AuthHttp", ['@angular/core', "auth-http/app/AuthConfig", '@angular/http', 'rxjs/Observable'], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_1, AuthConfig_1, http_1, Observable_1;
    var AuthHttp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (AuthConfig_1_1) {
                AuthConfig_1 = AuthConfig_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            AuthHttp = (function () {
                function AuthHttp(options, http, _defOpts) {
                    var _this = this;
                    this.http = http;
                    this._defOpts = _defOpts;
                    this._config = options.getConfig();
                    this.tokenStream = new Observable_1.Observable(function (obs) {
                        obs.next(_this._config.tokenGetter());
                    });
                }
                AuthHttp.prototype.setGlobalHeaders = function (headers, request) {
                    if (!request.headers) {
                        request.headers = new http_1.Headers();
                    }
                    headers.forEach(function (header) {
                        var key = Object.keys(header)[0];
                        var headerValue = header[key];
                        request.headers.set(key, headerValue);
                    });
                };
                AuthHttp.prototype.request = function (url, options) {
                    if (typeof url === 'string') {
                        return this.get(url, options);
                    }
                    var req = url;
                    req.headers.set(this._config.headerName, this._config.tokenGetter());
                    return this.http.request(req);
                };
                AuthHttp.prototype.mergeOptions = function (defaultOpts, providedOpts) {
                    var newOptions = defaultOpts || new http_1.RequestOptions();
                    if (this._config.globalHeaders) {
                        this.setGlobalHeaders(this._config.globalHeaders, providedOpts);
                    }
                    newOptions = newOptions.merge(new http_1.RequestOptions(providedOpts));
                    return newOptions;
                };
                AuthHttp.prototype.requestHelper = function (requestArgs, additionalOptions) {
                    var options = new http_1.RequestOptions(requestArgs);
                    if (additionalOptions) {
                        options = options.merge(additionalOptions);
                    }
                    return this.request(new http_1.Request(this.mergeOptions(this._defOpts, options)));
                };
                AuthHttp.prototype.get = function (url, options) {
                    return this.requestHelper({ url: url, method: http_1.RequestMethod.Get }, options);
                };
                AuthHttp.prototype.post = function (url, body, options) {
                    return this.requestHelper({ url: url, body: body, method: http_1.RequestMethod.Post }, options);
                };
                AuthHttp.prototype.put = function (url, body, options) {
                    return this.requestHelper({ url: url, body: body, method: http_1.RequestMethod.Put }, options);
                };
                AuthHttp.prototype.delete = function (url, options) {
                    return this.requestHelper({ url: url, method: http_1.RequestMethod.Delete }, options);
                };
                AuthHttp.prototype.patch = function (url, body, options) {
                    return this.requestHelper({ url: url, body: body, method: http_1.RequestMethod.Patch }, options);
                };
                AuthHttp.prototype.head = function (url, options) {
                    return this.requestHelper({ url: url, method: http_1.RequestMethod.Head }, options);
                };
                AuthHttp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [AuthConfig_1.AuthConfig, http_1.Http, http_1.RequestOptions])
                ], AuthHttp);
                return AuthHttp;
            }());
            exports_3("AuthHttp", AuthHttp);
        }
    }
});
System.register("auth-http/core", ["auth-http/app/AuthConfig", "auth-http/app/AuthHttp"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_4(exports);
    }
    return {
        setters:[
            function (AuthConfig_2_1) {
                exportStar_1(AuthConfig_2_1);
            },
            function (AuthHttp_1_1) {
                exportStar_1(AuthHttp_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=auth-http.js.map