export class Movie {
  id: string;
  title: string;
  duration: number;
  durationDisplay?: string;
  previewDetails?: string;
  budget: string;
  release_date: Date;

  constructor(
    id: string,
    title: string,
    duration: number,
    budget: string,
    release_date: Date
  ) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.budget = budget;
    this.release_date = release_date;
  }
}
