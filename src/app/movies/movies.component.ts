import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../movie-model/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  displayedMovies: Movie[] = [];
  fetchedMovies: Movie[] = [];
  titleFilter: FormControl<string | null> = new FormControl<string>('');
  releaseYearFilter: FormControl<string | null> = new FormControl<string>('');
  titleToFilter: string = '';
  yearToFilter: string = '';

  constructor(private movieService: MovieService, private router: Router) {
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.fetchedMovies =
        this.movieService.modifyDisplayPropertiesMovies(movies);
      this.displayedMovies = this.fetchedMovies;
    });
  }

  ngOnInit(): void {
    this.titleFilter.valueChanges.subscribe((titleFilter: string | null) => {
      this.titleToFilter = titleFilter ? titleFilter : '';
      this.displayedMovies = this.applyFilters(
        this.fetchedMovies,
        this.titleToFilter,
        this.yearToFilter
      );
    });
    this.releaseYearFilter.valueChanges.subscribe(
      (yearFilter: string | null) => {
        this.yearToFilter = yearFilter ? yearFilter : '';
        this.displayedMovies = this.applyFilters(
          this.fetchedMovies,
          this.titleToFilter,
          this.yearToFilter
        );
      }
    );
  }

  applyFilters(
    movies: Movie[],
    titleToFilter: string | null,
    releaseYearToFilter: string | null
  ): Movie[] {
    let filteredMovies: Movie[] = [...movies];
    if (titleToFilter) {
      filteredMovies = filteredMovies.filter((movie: Movie) =>
        movie.title
          .toLocaleLowerCase()
          .includes(titleToFilter.toLocaleLowerCase())
      );
    }
    if (releaseYearToFilter) {
      filteredMovies = filteredMovies.filter((movie: Movie) =>
        new Date(movie.release_date)
          .getFullYear()
          .toString()
          .includes(releaseYearToFilter)
      );
    }
    return filteredMovies;
  }

  goToMovieDetail(movieId: string): void {
    this.router.navigate([`movies/${movieId}`]);
  }
}
