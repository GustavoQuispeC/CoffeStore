import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimony } from 'src/entities/testimony.entity';
import { Repository } from 'typeorm';
import { CreateTestimonyDto } from './testimony.dto';

@Injectable()
export class TestimonyService {

    constructor(@InjectRepository(Testimony) private testimonyRepository: Repository<Testimony>){}

    async getTestimonials() {
            const testimonies = await this.testimonyRepository.find({})
            return testimonies
    }

    async createTestimony(testimony: CreateTestimonyDto) {
        // const newTestimony = await this.testimonyRepository.save(testimony)
        // const findTestimony = await this.testimonyRepository.find({where: { email: newTestimony.email }})
        // if (!findTestimony) throw new BadRequestException('Testimony not found after creation');
        // const { name } = findTestimony[0];
        // return { message: name + ' left a comment',
        //          testimony: findTestimony
        // }
    }
}


