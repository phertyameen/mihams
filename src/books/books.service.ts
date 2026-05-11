import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  private idCounter = 1;

  // Add Book
  create(createBookDto: CreateBookDto) {
    const { bookName, author } = createBookDto;

    // validation
    if (!bookName || !author) {
      throw new BadRequestException('All fields are required');
    }

    // check duplicate
    const existingBook = this.books.find(
      (book) =>
        book.bookName.toLowerCase() === bookName.toLowerCase() &&
        book.author.toLowerCase() === author.toLowerCase(),
    );

    if (existingBook) {
      throw new BadRequestException('Book already exists');
    }

    const newBook: Book = {
      id: this.idCounter++,
      bookName,
      author,
    };

    this.books.push(newBook);

    return {
      success: true,
      message: 'Book added successfully',
      data: newBook,
    };
  }

  // Get all books
  findAll() {
    return {
      success: true,
      count: this.books.length,
      data: this.books,
    };
  }

  // Get one book
  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      success: true,
      data: book,
    };
  }

  // Update book
  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const { bookName, author } = updateBookDto;

    if (!bookName || !author) {
      throw new BadRequestException('All fields are required');
    }

    book.bookName = bookName;
    book.author = author;

    return {
      success: true,
      message: 'Book updated successfully',
      data: book,
    };
  }

  // Delete book
  remove(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }

    const deletedBook = this.books[bookIndex];

    this.books.splice(bookIndex, 1);

    return {
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook,
    };
  }
}