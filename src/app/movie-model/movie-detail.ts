import { Movie } from './movie';

export class MovieDetail extends Movie {
  box_office: number;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
  box_officeDisplay?: string;
  producersDisplay?: string;

  constructor(
    id: string,
    title: string,
    duration: number,
    budget: string,
    release_date: Date,
    box_office: number,
    cinematographers: string[],
    poster: string,
    producers: string[],
    summary: string
  ) {
    super(id, title, duration, budget, release_date);
    this.box_office = box_office;
    this.cinematographers = cinematographers;
    this.poster = poster;
    this.producers = producers;
    this.summary = summary;
  }
}
