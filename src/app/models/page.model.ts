import { ChapterDTO, LastAnimeInfoDTO, TopDTO } from "./individual.model";

export class HomePageDTO {
  sliderAnimes!: ChapterDTO[];
  ovasOnasSpecials!: LastAnimeInfoDTO[];
  animesProgramming!: ChapterDTO[];
  donghuasProgramming!: ChapterDTO[];
  topAnimes!: TopDTO[];
  latestAddedAnimes!: ChapterDTO[];
  latestAddedList!: ChapterDTO[];
}


export class AnimeInfoDTO {
  name!: string;
  sinopsis!: string;
  imgUrl!: string;
  chapters!: ChapterDTO[];
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