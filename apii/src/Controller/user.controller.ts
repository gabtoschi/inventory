import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UserService } from '../Service/user.service';
import { UserDto } from '../dtos/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private service: UserService,
    ) {}


    @Get()
    public async getuser(@Body() name: string, email: string, password: string){
        return this.service.loginUser(name, email, password);;
    }

    @Post()
    public async create(@Body() dto: UserDto) {
        return this.service.registerUser(new User(dto.name, dto.email, dto.password));
    }

    
    
}
