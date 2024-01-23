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
  imgUrl!: string;
  sinopsis!: string;
  likes!: number;
  
  data!: {[key: string]: any}
  alternativeTitles!: {[key: string]: any}

  ytTrailerId!: string;
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
  lastChapterNumber!: number;
  lastChapterImg!: string;
  lastChapterDate!: string;
}