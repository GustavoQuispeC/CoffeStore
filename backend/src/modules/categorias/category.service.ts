import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    

    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>){}

    
}
