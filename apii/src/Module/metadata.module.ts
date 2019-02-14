import { Module } from '@nestjs/common';

import { MetadataService } from '../Service/metadata.service';
import { MetadataController } from '../Controller/metadata.controller';

@Module({
    controllers: [MetadataController],
    providers: [MetadataService],
})
export class MetadataModule {}
