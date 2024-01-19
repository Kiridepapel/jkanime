import { AnimeDTO } from "./individual.model";

export class HomePageDTO {
  lastChapters!: AnimeDTO[];
  allAnimes!: AnimeDTO[];
  emisionAnimes!: AnimeDTO[];
}

export class AnimeInfoDTO {
  name!: string;
  sinopsis!: string;
  imgUrl!: string;
  chapters!: AnimeDTO[];
  genres!: string[];
}

export class SpecificChapterDTO {
  name!: string;
  srcOptions!: LinkDTO[];
  downloadOptions!: LinkDTO[];
  previousChapterUrl?: string;
  nextChapterUrl?: string;
}

export class LinkDTO {
  name!: string;
  url!: string;
}