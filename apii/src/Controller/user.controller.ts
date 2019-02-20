import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UserService } from '../Service/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private service: UserService,
    ) {}


    @Post()
    public async getuser(@Body() name: string, email: string, password: string){
        this.service.loginUser(name, email, password);
        return ;
    }

    // @Post()
    // public async create(@Body() dto: CreateUserDto) {
    //     return this.service.registerUser(new User(dto.name, dto.email, dto.password));
    // }

    
    
}
