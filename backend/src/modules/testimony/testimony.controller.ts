import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestimonyService } from './testimony.service';
import { CreateTestimonyDto } from './testimony.dto';

@Controller('testimony')
export class TestimonyController {
    constructor(private readonly testimonyService:TestimonyService){}

    @Get()
    async getTestimonials(){
            return await this.testimonyService.getTestimonials()
    }

    @Post()
    async createTestimony(@Body() testimony: CreateTestimonyDto){
        const { userId, ...testimonyEntity } = testimony
        return this.testimonyService.createTestimony(userId, testimonyEntity)
    }

}