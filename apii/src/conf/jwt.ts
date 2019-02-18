import { DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Env } from './env';

export function JwtConf(): DynamicModule {
    return JwtModule.register({
        secretOrPrivateKey: Env.jwtSecret(),
        signOptions: {
            expiresIn: Env.jwtExpire(),
        },
    });
}

export function Passport(): DynamicModule {
    return PassportModule.register({ defaultStrategy: 'jwt-deafult'});
}
