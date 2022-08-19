"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../users/users.service");
const auths_service_1 = require("./auths.service");
let AuthsController = class AuthsController {
    constructor(usersService, authsService) {
        this.usersService = usersService;
        this.authsService = authsService;
    }
    async loginGoogle(req, res) {
        let user = await this.usersService.findOne({ email: req.user.email });
        if (!user) {
            user = await this.usersService.create(Object.assign({}, req.user));
        }
        this.authsService.setRefreshToken({ user, res });
        res.redirect('http://localhost:5500/class/21-03-login-google/frontend/social-login.html');
    }
};
__decorate([
    (0, common_1.Get)('/login/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthsController.prototype, "loginGoogle", null);
AuthsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auths_service_1.AuthsService])
], AuthsController);
exports.AuthsController = AuthsController;
//# sourceMappingURL=auth.controller.js.map