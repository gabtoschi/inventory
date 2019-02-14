import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';

import { Game } from '../interfaces/game.interface';
import { GamesService } from '../Service/games.service';

import { CreateGameDto } from '../dtos/create-game.dto';
import { EditGameDto } from '../dtos/edit-game.dto';

@Controller('games')
export class GamesController {

    constructor(
        private service: GamesService,
    ) {}

    @Get()
    public async getAll(): Promise<Game[]> {
        return this.service.getAll();
    }

    @Get(':slug')
    public async getGame(@Param() params): Promise<Game> {
        return this.service.getBySlug(params.slug);
    }

    @Post()
    public async create(@Body() dto: CreateGameDto) {
        return this.service.create(new Game(dto.name, dto.developer, dto.publisher, dto.category, dto.platforms));
    }

    @Delete(':slug')
    public async remove(@Param() params) {
        if (!this.service.removeBySlug(params.slug)) {
            throw new NotFoundException();
        }
    }

    @Put(':slug')
    public async edit(@Body() dto: EditGameDto, @Param() params) {
        if (!this.service.editBySlug(params.slug,
            new Game(dto.name, dto.developer, dto.publisher, dto.category, dto.platforms))) {
                throw new NotFoundException();
            }
    }
}
