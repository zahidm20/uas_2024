import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Controller('book')
export class BookController {
    constructor (private bookService : BookService) {}
    @Get('list')
    getAllBook(){
        return this.bookService.getAllBook();
    }

    @Post('create')
    createBook(@Body() payload:CreateBookDto){
        console.log('payload', payload)
        return this.bookService.createBook(payload);
    }

    @Put('update/:id')
    updateBook(@Param('id') id:string, @Body() payload:UpdateBookDto) {
        return this.bookService.updateBook(Number(id), payload);
    }

    @Get('detail/:id')
    getDetail(@Param('id') id:string ){
        return this.bookService.getDetail(Number(id));
    }

    
    @Delete('delete/:id')
    deleteBook(@Param('id') id:string ){
        return this.bookService.deleteBook(+id)
    }
    


}

const array = [
    {
        id : 1,
    },
    {
        id : 2,
    },
    {
        id: 3,
    }
]