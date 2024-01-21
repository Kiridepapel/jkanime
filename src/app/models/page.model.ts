import { ChapterDataDTO, LastAnimeDataDTO, LinkDTO, TopDataDTO } from "./individual.model";

export class HomePageDTO {
  sliderAnimes!: ChapterDataDTO[];
  ovasOnasSpecials!: LastAnimeDataDTO[];
  animesProgramming!: ChapterDataDTO[];
  donghuasProgramming!: ChapterDataDTO[];
  topAnimes!: TopDataDTO[];
  latestAddedAnimes!: ChapterDataDTO[];
  latestAddedList!: ChapterDataDTO[];
}

export class AnimeInfoDTO {
  name!: string;
  sinopsis!: string;
  imgUrl!: string;
  chapters!: ChapterDataDTO[];
  genres!: string[];
}

export class ChapterDTO {
  name!: string;
  actualChapterNumber!: string;
  srcOptions!: LinkDTO[];
  downloadOptions?: LinkDTO[];
  havePreviousChapter!: boolean;
  haveNextChapter!: boolean;
  nextChapterDate?: string;
  state!: string;

  // External
  lastChapterNumber!: number;
  lastChapterImg!: string;
  lastChapterDate!: string;
}