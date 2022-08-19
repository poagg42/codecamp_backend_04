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
exports.PointsTransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const pointTransaction_entity_1 = require("./entities/pointTransaction.entity");
let PointsTransactionsService = class PointsTransactionsService {
    constructor(pointsTransactionsRepository, usersRepository) {
        this.pointsTransactionsRepository = pointsTransactionsRepository;
        this.usersRepository = usersRepository;
    }
    async create({ impUid, amount, user: _user }) {
        const pointTransaction = this.pointsTransactionsRepository.create({
            impUid: impUid,
            amount: amount,
            user: _user,
            status: pointTransaction_entity_1.POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        });
        await this.pointsTransactionsRepository.save({});
        const user = await this.usersRepository.findOne({
            where: { id: _user.id },
        });
        await this.usersRepository.update({ id: _user.id }, { point: user.point + amount });
        return pointTransaction;
    }
};
PointsTransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pointTransaction_entity_1.PointTransaction)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PointsTransactionsService);
exports.PointsTransactionsService = PointsTransactionsService;
//# sourceMappingURL=pointsTransactions.services.js.map