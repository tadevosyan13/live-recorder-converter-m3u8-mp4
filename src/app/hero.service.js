"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
};
var BlobService = /** @class */ (function () {
    function BlobService() {
    }
    BlobService.prototype.sendBlob = function (blob) {
        return this.http.post('../../server/server.js', blob, httpOptions)
            .pipe(operators_1.catchError(this.handleError('downloadBlob', blob)));
    };
    BlobService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BlobService);
    return BlobService;
}());
exports.BlobService = BlobService;
