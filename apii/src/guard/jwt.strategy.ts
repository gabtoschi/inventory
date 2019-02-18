import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from 'src/Service/auth.service';
import { JwtPayload } from 'src/dtos/jwt-payload.dto';
import { Env } from 'src/conf/env';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-default') {

    public static jwtSecret = () => process.env.JWT_SECRET || 'JWT_SUPER_SECRET';


    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Env.jwtSecret(),
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
