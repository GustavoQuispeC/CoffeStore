import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(
        new ParseFilePipeBuilder()
        .addMaxSizeValidator({
            maxSize: 500000,
            message: 'El archivo es muy largo, el tamaño maximo es de 500KB',
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    ) file?: Express.Multer.File){
        
        const url = await this.imageService.uploadFile(file);
        return {url};
    }

}
