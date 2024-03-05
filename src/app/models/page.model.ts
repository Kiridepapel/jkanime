import { ChapterDataDTO, AnimeDataDTO, LinkDTO, TopDataDTO } from "./individual.model";

export class HomePageDTO {
  sliderAnimes!: ChapterDataDTO[];
  ovasOnasSpecials!: AnimeDataDTO[];
  animesProgramming!: ChapterDataDTO[];
  nextAnimesProgramming!: ChapterDataDTO[];
  donghuasProgramming!: ChapterDataDTO[];
  topAnimes!: TopDataDTO[];
  latestAddedAnimes!: AnimeDataDTO[];
  latestAddedList!: LinkDTO[];
}

export class DirectoryOptionsDTO {
  genres!: LinkDTO[];
  seasons!: LinkDTO[];
  studios!: LinkDTO[];
  status!: LinkDTO[];
  types!: LinkDTO[];
  subs!: LinkDTO[];
  orders!: LinkDTO[];
}

export class ScheduleDTO {
  todayValue!: number;
  seasonName!: string;
  seasonMonths!: string[];
  monday!: ChapterDataDTO[];
  tuesday!: ChapterDataDTO[];
  wednesday!: ChapterDataDTO[];
  thursday!: ChapterDataDTO[];
  friday!: ChapterDataDTO[];
  saturday!: ChapterDataDTO[];
  sunday!: ChapterDataDTO[];
}

export class TopDTO {
  top!: TopDataDTO[];
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

export class SearchDTO {
  lastPage?: number;
  searchList!: AnimeDataDTO[];
  message?: string; // Cuando no se encuentra nada
}