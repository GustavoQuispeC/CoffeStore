import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestimonyService } from './testimony.service';
import { CreateTestimonyDto } from './testimony.dto';

@Controller('testimony')
export class TestimonyController {
    constructor(private readonly testimonyService:TestimonyService){}

    @Get()
    getTestimonials(){
            return this.testimonyService.getTestimonials()
    }

    @Post()
    createTestimony(@Body() testimony: CreateTestimonyDto){
        return this.testimonyService.createTestimony(testimony)
    }
}
