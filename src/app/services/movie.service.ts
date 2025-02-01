import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../movie-model/movie';
import { MovieDetail } from '../movie-model/movie-detail';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.httpClient
      .get(`/movies`)
      .pipe(map((object) => object as Movie[]));
  }

  getMovieDetail(id: string): Observable<MovieDetail> {
    return this.httpClient
      .get(`/movies/${id}`)
      .pipe(map((object) => object as MovieDetail));
  }

  modifyDisplayPropertiesMovieDetail(movieDetail: MovieDetail): MovieDetail {
    return {
      ...movieDetail,
      box_officeDisplay: `$${movieDetail.box_office} million`,
      budget: `$${movieDetail.budget} million`,
      durationDisplay: this.durationInHandMin(movieDetail.duration),
      producersDisplay: movieDetail.producers.join(', '),
    };
  }

  modifyDisplayPropertiesMovies(movies: Movie[]): Movie[] {
    let displayedMovies: Movie[] = [];
    movies.forEach((movie) => {
      displayedMovies.push({
        ...movie,
        budget: `$${movie.budget} million`,
        durationDisplay: this.durationInHandMin(movie.duration),
        previewDetails: `Release date: ${formatDate(
          movie.release_date,
          'yyyy-MM-dd',
          'en-US'
        )}    Budget: $${
          movie.budget
        } million    Duration: ${this.durationInHandMin(movie.duration)}`,
      });
    });
    return displayedMovies;
  }

  durationInHandMin(durationMinutes: number): string {
    const minutes: number = durationMinutes % 60;
    const hours: number = Math.floor(durationMinutes / 60);
    return `${this.pad2Digits(hours)}h ${this.pad2Digits(minutes)}min`;
  }

  private pad2Digits(number: number): string {
    return number.toString().padStart(2, '0');
  }
}
