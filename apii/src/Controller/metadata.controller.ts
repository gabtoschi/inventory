import { Controller, Get } from '@nestjs/common';

import { MetadataService } from '../Service/metadata.service';

@Controller('metadata')
export class MetadataController {

    constructor(
        private readonly service: MetadataService,
    ) {}

    @Get('genres')
    public async getGameGenres(): Promise<string[]> {
        return this.service.getGameGenres();
    }

    @Get('platforms')
    public async getGamePlatforms(): Promise<string[]> {
        return this.service.getGamePlatforms();
    }
}
