import { ChapterDataDTO, AnimeDataDTO, LinkDTO, TopDataDTO } from "./individual.model";

export class HomePageDTO {
  sliderAnimes!: ChapterDataDTO[];
  ovasOnasSpecials!: AnimeDataDTO[];
  animesProgramming!: ChapterDataDTO[];
  nextAnimesProgramming!: ChapterDataDTO[];
  donghuasProgramming!: ChapterDataDTO[];
  topAnimes!: TopDataDTO[];
  latestAddedAnimes!: ChapterDataDTO[];
  latestAddedList!: ChapterDataDTO[];
}

export class AnimeInfoDTO {
  name!: string;
  alternativeName!: string;
  imgUrl!: string;
  synopsis!: string;
  synopsisEnglish!: string;
  trailer!: string;
  likes!: number;
  
  data!: {[key: string]: any}
  alternativeTitles!: {[key: string]: any}
  history!: {[key: string]: any}

  lastChapter!: number;
  lastChapterDate!: string;
  nextChapterDate!: string;

  chapterList!: ChapterDataDTO[];

  // Alter
  // isNewestChapter!: boolean;
  // recomendations!: LastAnimeDataDTO[];
}

export class ChapterDTO {
  name!: string;
  actualChapterNumber!: string;
  srcOptions!: LinkDTO[];
  downloadOptions?: LinkDTO[];
  havePreviousChapter!: boolean;
  haveNextChapter!: boolean;
  nextChapterDate?: string;
  inEmision!: boolean;

  // External
  actualChapter!: string;
  previousChapter!: string;
  nextChapter!: string;
  firsChapter!: string;
  lastChapter!: string;

  chapterImg!: string;
  lastChapterDate!: string;
}

export class DirectoryOptionsDTO {
  genres!: LinkDTO[];
  seasons!: LinkDTO[];
  studios!: LinkDTO[];
  types!: LinkDTO[];
  subs!: LinkDTO[];
  orders!: LinkDTO[];
}

export class SearchDTO {
  lastPage?: number;
  searchList!: AnimeDataDTO[];
  message?: string; // Cuando no se encuentra nada
}