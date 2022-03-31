import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from '../dto/category.dto';
import { Repository } from 'typeorm';
import { Category } from '../model/categoty.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async insert(category: CategoryDto): Promise<Category> {
    const newCategory = new Category();
    Object.keys(category).forEach((key) => {
      newCategory[key] = category[key];
    });
    try {
      return await this.categoryRepository.save(newCategory);
    } catch (err) {
      return err;
    }
  }  

  async update(oldcategory: Category, updated_values: CategoryDto): Promise<Category> {
    const updatedCategory = oldcategory;
    Object.keys(updated_values).forEach((key) => {
      updatedCategory[key] = updated_values[key];
    });
    try {
      return await this.categoryRepository.save(updatedCategory);
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (err) {
      return err;
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOne(id);
    } catch (err){
      return err;
    }
  }

  async remove(id: number) {
    try {
       return await this.categoryRepository.delete(id);
     } catch (err) {
       return err;
     }
   }
}



