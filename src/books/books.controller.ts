import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Add Book
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  // Get all books
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // Get one book
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  // Update book
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(Number(id), updateBookDto);
  }

  // Delete book
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(Number(id));
  }
}