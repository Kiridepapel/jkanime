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
  alternativeName!: string;
  imgUrl!: string;
  sinopsis!: string;
  trailer!: string;
  likes!: number;
  
  data!: {[key: string]: any}
  alternativeTitles!: {[key: string]: any}
  history!: {[key: string]: any}

  nextChapterDate!: string;
  firstChapter!: number;
  lastChapter!: number;

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
  chapterImg!: string;
  actualChapter!: number;
  firstChapter!: number;
  lastChapter!: number;
  lastChapterDate!: string;
}