"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const boards_module_1 = require("./apis/boards/boards.module");
const config_1 = require("@nestjs/config");
const product_module_1 = require("./apis/products/product.module");
const users_module_1 = require("./apis/users/users.module");
const auths_module_1 = require("./apis/auths/auths.module");
const pointsTransactions_module_1 = require("./apis/pointsTransactions/pointsTransactions.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auths_module_1.AuthsModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            boards_module_1.BoardsModule,
            pointsTransactions_module_1.PointsTransactionsModule,
            product_module_1.ProductModule,
            users_module_1.UsersModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'src/commons/graphql/schema.gql',
                context: ({ req, res }) => ({ req, res }),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DATABASE_TYPE,
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATABASE,
                entities: [__dirname + '/apis/**/*.entity.*'],
                synchronize: true,
                logging: true,
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map