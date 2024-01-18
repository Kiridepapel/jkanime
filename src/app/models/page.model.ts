import { AnimeDTO } from "./individual.model";

export class HomePageDTO {
  lastChapters: AnimeDTO[] = [];
  allAnimes: AnimeDTO[] = [];
  emisionAnimes: AnimeDTO[] = [];
}

export class AnimeInfoDTO {
  name: string = '';
  sinopsis: string = '';
  imgUrl: string = '';
  chapters: AnimeDTO[] = [];
  genres: string[] = [];
}

export class SpecificEpisodeDTO {
  name: string = '';
  iframeSrc: string = '';
  previousEpisodeUrl: string = '';
  nextEpisodeUrl: string = '';
}