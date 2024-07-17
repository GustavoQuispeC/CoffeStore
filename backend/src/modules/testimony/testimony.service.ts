import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimony } from 'src/entities/testimony.entity';
import { Repository } from 'typeorm';
import { CreateTestimonyEntityDto } from './testimony.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TestimonyService {

    constructor(@InjectRepository(Testimony) private testimonyRepository: Repository<Testimony>){}

    async getTestimonials() {
            const testimonies = await this.testimonyRepository.find({
                relations: ['user']
            })
            return testimonies
    }

    async createTestimony(userID: string, testimony: CreateTestimonyEntityDto) {
        const userFound = await User.findOneBy({id : userID})
        if (!userFound) throw new BadRequestException('user not found');

        const newTestimony = await this.testimonyRepository.create({
            ...testimony,
            user: userFound
        })
        await this.testimonyRepository.save(newTestimony);

        const findTestimony = await this.testimonyRepository.find({where: { id: newTestimony.id }})
        if (!findTestimony) throw new BadRequestException('Testimony not found after creation');

        const { name } = userFound
        
        return { message: name + ' left a comment',
                 testimony: findTestimony[0].description
        }
    }
}


