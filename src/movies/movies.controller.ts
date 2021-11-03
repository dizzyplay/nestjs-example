import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get('search')
  search(@Query('year') year: number) {
    return `searching...${year}`;
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    console.log(typeof id);
    return this.movieService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    this.movieService.getOne(id);
    return this.movieService.delete(id);
  }

  @Patch('/:id')
  patch(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.patch(id, updateData);
  }
}
