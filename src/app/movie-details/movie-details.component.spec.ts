import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MovieDetail } from '../movie-model/movie-detail';
import { MovieService } from '../services/movie.service';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent, HttpClientModule],
      providers: [MovieService, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.movieDetail = new MovieDetail(
      '1',
      'title',
      123,
      '0.2',
      new Date('2021-01-02'),
      456,
      [''],
      'test',
      [''],
      ''
    );
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
