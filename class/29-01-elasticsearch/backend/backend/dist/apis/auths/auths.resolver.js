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
exports.AuthsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("../users/users.service");
const auths_service_1 = require("./auths.service");
const bcrypt = require("bcrypt");
const gql_auth_guard_1 = require("../../commons/auth/gql-auth.guard");
const common_2 = require("@nestjs/common");
let AuthsResolver = class AuthsResolver {
    constructor(usersService, authsService) {
        this.usersService = usersService;
        this.authsService = authsService;
    }
    async login(email, password, context) {
        const user = await this.usersService.findOne({ email });
        if (!user)
            throw new common_1.UnprocessableEntityException('이메일이 없습니다.');
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new common_1.UnprocessableEntityException('암호가 틀렸습니다.');
        this.authsService.setRefreshToken({ user, res: context.res });
        return this.authsService.getAccessToken({ user });
    }
    restoreAccessToken(context) {
        return this.authsService.getAccessToken({ user: context.req.user });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthsResolver.prototype, "login", null);
__decorate([
    (0, common_2.UseGuards)(gql_auth_guard_1.GqlAuthRefreshGuard),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthsResolver.prototype, "restoreAccessToken", null);
AuthsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auths_service_1.AuthsService])
], AuthsResolver);
exports.AuthsResolver = AuthsResolver;
//# sourceMappingURL=auths.resolver.js.map