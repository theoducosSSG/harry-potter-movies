import { NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { MovieDetail } from '../movie-model/movie-detail';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<void> = new Subject<void>();
  srcImg: string =
    'https://i.pinimg.com/736x/8a/b2/1b/8ab21b1edaa6d6d3405af14cd018a91b.jpg';
  movieDetail: MovieDetail | undefined;

  constructor(
    private movieService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((params: Params) =>
          this.movieService.getMovieDetail(params['movieId'])
        ),
        catchError((err) => {
          this.srcImg =
            'https://pixabay.com/vectors/404-error-error-panel-warning-3060993/';
          if (err.value) {
            return of(err.value);
          }
          throw err;
        })
      )
      .subscribe((movieDetail: MovieDetail) => {
        if (movieDetail) {
          this.movieDetail =
            this.movieService.modifyDisplayPropertiesMovieDetail(movieDetail);
          this.srcImg = this.movieDetail.poster;
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  returnButton() {
    this.router.navigate(['/movies']);
  }
}
