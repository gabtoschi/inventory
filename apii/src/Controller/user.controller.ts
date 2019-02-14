import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UserService } from '../Service/user.service';

import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private service: UserService,
    ) {}

    @Get()
    public async getAll(): Promise<User[]> {
        return this.service.getAll();
    }

    @Get(':email')
    public async getGame(@Param() params): Promise<User> {
        return this.service.getByEmail(params.email);
    }

    @Post()
    public async create(@Body() dto: CreateUserDto) {
        return this.service.create(new User(dto.name, dto.email, dto.password));
    }

    // @Delete(':slug')
    // public async remove(@Param() params) {
    //     if (!this.service.removeBySlug(params.slug)) {
    //         throw new NotFoundException();
    //     }
    // }

    // @Put(':slug')
    // public async edit(@Body() dto: EditGameDto, @Param() params) {
    //     if (!this.service.editBySlug(params.slug,
    //         new Game(dto.name, dto.developer, dto.publisher, dto.category, dto.platforms))) {
    //             throw new NotFoundException();
    //         }
    // }
}
