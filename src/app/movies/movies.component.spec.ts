import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { Movie } from '../movie-model/movie';
import { MovieService } from '../services/movie.service';
import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent, HttpClientModule],
      providers: [MovieService],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    component.fetchedMovies = [
      new Movie('1', 'title1', 123, '1.25', new Date('2022-07-01')),
      new Movie('2', 'title2', 456, '2.26', new Date('2022-09-12')),
      new Movie('3', 'title21', 456, '2.26', new Date('1999-01-01')),
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.querySelector('h1')?.textContent).toContain(
      'Harry Potter Movies'
    );
  });

  it('test applyFilters no filter', () => {
    const expectedMovies: Movie[] = [
      new Movie('1', 'title1', 123, '1.25', new Date('2022-07-01')),
      new Movie('2', 'title2', 456, '2.26', new Date('2022-09-12')),
      new Movie('3', 'title21', 456, '2.26', new Date('1999-01-01')),
    ];
    expect(component.applyFilters(component.fetchedMovies, null, null)).toEqual(
      expectedMovies
    );
  });

  it('test applyFilters no filter', () => {
    const expectedMovies: Movie[] = [
      new Movie('1', 'title1', 123, '1.25', new Date('2022-07-01')),
      new Movie('2', 'title2', 456, '2.26', new Date('2022-09-12')),
      new Movie('3', 'title21', 456, '2.26', new Date('1999-01-01')),
    ];
    expect(component.applyFilters(component.fetchedMovies, null, null)).toEqual(
      expectedMovies
    );
  });

  it('test applyFilters filter title', () => {
    const expectedMovies: Movie[] = [
      new Movie('2', 'title2', 456, '2.26', new Date('2022-09-12')),
      new Movie('3', 'title21', 456, '2.26', new Date('1999-01-01')),
    ];
    expect(
      component.applyFilters(component.fetchedMovies, 'title2', null)
    ).toEqual(expectedMovies);
  });

  it('test applyFilters filter release year', () => {
    const expectedMovies: Movie[] = [
      new Movie('1', 'title1', 123, '1.25', new Date('2022-07-01')),
      new Movie('2', 'title2', 456, '2.26', new Date('2022-09-12')),
    ];
    expect(
      component.applyFilters(component.fetchedMovies, null, '2022')
    ).toEqual(expectedMovies);
  });

  it('test applyFilters filter title and release year', () => {
    const expectedMovies: Movie[] = [
      new Movie('2', 'title2', 456, '2.26', new Date('2022-09-12')),
    ];
    expect(
      component.applyFilters(component.fetchedMovies, 'title2', '2022')
    ).toEqual(expectedMovies);
  });
});
