"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const auths_resolver_1 = require("./auths.resolver");
const auths_service_1 = require("./auths.service");
const user_entity_1 = require("../users/entities/user.entity");
const jwt_access_strategy_1 = require("../../commons/auth/jwt-access.strategy");
const jwt_refresh_strategy_1 = require("../../commons/auth/jwt-refresh.strategy");
const jwt_social_google_strategy_1 = require("../../commons/auth/jwt-social-google.strategy");
const auth_controller_1 = require("./auth.controller");
let AuthsModule = class AuthsModule {
};
AuthsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
            ]),
        ],
        providers: [
            jwt_access_strategy_1.JwtAccessStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            jwt_social_google_strategy_1.JwtGoogleStrategy,
            auths_resolver_1.AuthsResolver,
            auths_service_1.AuthsService,
            users_service_1.UsersService,
        ],
        controllers: [auth_controller_1.AuthsController],
    })
], AuthsModule);
exports.AuthsModule = AuthsModule;
//# sourceMappingURL=auths.module.js.map