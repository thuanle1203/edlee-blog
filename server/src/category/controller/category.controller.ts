import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CategoryService } from '../service/category.service';  
import { CategoryDto } from '../dto/category.dto';
import { CategoryIdDto } from '../dto/categoryId.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() Category: CategoryDto): Promise<CategoryDto> {
    return await this.categoryService.insert(Category);
  }

  @Get()
  async findAll(): Promise<CategoryIdDto[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CategoryIdDto> {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategory: CategoryDto): Promise<CategoryIdDto> {
    const oldcategory = await this.categoryService.findOne(id);
    return await this.categoryService.update(oldcategory, updateCategory);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.categoryService.remove(id);
  }
}

