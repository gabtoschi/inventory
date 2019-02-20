import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtPayload } from '../dtos/jwt-payload.dto';
import { UserDto } from '../dtos/user.dto';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private service: UserService
  ) {}

  async signIn(validateUser: UserDto): Promise<{validateUser: UserDto, token: string}> {
    
    const verificationUser: boolean = await this.usersService.validateEmail(validateUser);

    if(!verificationUser){
      return null;
    }

    const paylad: JwtPayload = { email: validateUser.email };

    return { validateUser, token: this.jwtService.sign(paylad)};
  }

  async validateUser(payload: JwtPayload): Promise<any> {

    let user = new User('',payload.email,'');
                    
    return user;
}
}