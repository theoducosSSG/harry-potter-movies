import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { Movie } from '../movie-model/movie';
import { MovieDetail } from '../movie-model/movie-detail';
import { MovieService } from './movie.service';

describe('MoviesService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test modifyDisplayPropertiesMovieDetail', () => {
    const testMovieDetail: MovieDetail = new MovieDetail(
      '1',
      'title1',
      120,
      '1.2',
      new Date('2000-01-01'),
      789,
      ['Cine1', 'Cine2'],
      'poster1',
      ['Prod1', 'Prod2'],
      'summary1'
    );

    let expectedMovieDetail: MovieDetail = structuredClone(testMovieDetail);
    expectedMovieDetail.box_officeDisplay = '$789 million';
    expectedMovieDetail.budget = '$1.2 million';
    expectedMovieDetail.durationDisplay = '02h 00min';
    expectedMovieDetail.producersDisplay = 'Prod1, Prod2';

    expect(
      service.modifyDisplayPropertiesMovieDetail(testMovieDetail)
        .box_officeDisplay
    ).toEqual(expectedMovieDetail.box_officeDisplay);
    expect(
      service.modifyDisplayPropertiesMovieDetail(testMovieDetail).budget
    ).toEqual(expectedMovieDetail.budget);
    expect(
      service.modifyDisplayPropertiesMovieDetail(testMovieDetail)
        .durationDisplay
    ).toEqual(expectedMovieDetail.durationDisplay);
    expect(
      service.modifyDisplayPropertiesMovieDetail(testMovieDetail)
        .producersDisplay
    ).toEqual(expectedMovieDetail.producersDisplay);
  });

  it('test modifyDisplayPropertiesMovies', () => {
    const testMovies: Movie[] = [
      new Movie('1', 'title1', 120, '1.2', new Date('2000-01-01')),
      new Movie('2', 'title2', 90, '23', new Date('2022-02-04')),
    ];

    let expectedMovies: Movie[] = structuredClone(testMovies);
    expectedMovies[0].budget = '$1.2 million';
    expectedMovies[0].durationDisplay = '02h 00min';
    expectedMovies[1].budget = '$23 million';
    expectedMovies[1].durationDisplay = '01h 30min';

    expect(service.modifyDisplayPropertiesMovies(testMovies)[0].budget).toEqual(
      expectedMovies[0].budget
    );
    expect(
      service.modifyDisplayPropertiesMovies(testMovies)[0].durationDisplay
    ).toEqual(expectedMovies[0].durationDisplay);

    expect(service.modifyDisplayPropertiesMovies(testMovies)[1].budget).toEqual(
      expectedMovies[1].budget
    );
    expect(
      service.modifyDisplayPropertiesMovies(testMovies)[1].durationDisplay
    ).toEqual(expectedMovies[1].durationDisplay);
  });
});
