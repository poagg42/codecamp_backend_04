"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class JwtGoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor() {
        super({
            clientID: '317609674266-v27pi7h8s5hnfi284bq67tvp1d8n1uk4.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/login/google',
            scope: ['email', 'profile'],
        });
    }
    validate(accessToken, refreshToken, profile) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        return {
            email: profile.emails[0].value,
            hashedPassword: '1234',
            name: profile.displayName,
            age: 0,
        };
    }
}
exports.JwtGoogleStrategy = JwtGoogleStrategy;
//# sourceMappingURL=jwt-social-google.strategy.js.map