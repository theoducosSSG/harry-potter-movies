import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'movies/:movieId',
    component: MovieDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
