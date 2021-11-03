import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((m) => m.id === id);
    if (!movie) {
      throw new NotFoundException('movie with id not found');
    }
    return movie;
  }

  create(movieData: CreateMovieDto) {
    console.info(movieData);
    const movie = {
      id: this.movies.length + 1,
      ...movieData,
    };
    this.movies.push(movie);
    return true;
  }

  delete(id: number) {
    this.movies = this.movies.filter((m) => m.id !== +id);
    return true;
  }

  patch(id: number, movieData: UpdateMovieDto) {
    let updatedMovie = this.movies.find((m) => m.id === +id);
    updatedMovie = { ...updatedMovie, ...movieData };
    this.movies = [...this.movies.filter((m) => +m.id !== +id), updatedMovie];
  }
}
