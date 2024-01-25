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
  
  data!: {[key: string]: any}

  nextChapterDate!: string;
  firstChapter!: number;
  lastChapter!: number;

  recomendations!: LastAnimeDataDTO[];
}
// {
//   "duration": "25 min.",
//   "studio": [
//       {
//           "name": "Shin-Ei Animation",
//           "url": "studio/shin-ei-animation/"
//       }
//   ],
//   "cast": [
//       {
//           "name": "Youmiya, Hina",
//           "url": "cast/youmiya-hina/"
//       },
//       {
//           "name": "Tanezaki, Atsumi",
//           "url": "cast/tanezaki-atsumi/"
//       }
//   ],
//   "year": [
//       {
//           "name": "2024",
//           "url": "season/2024/"
//       },
//       {
//           "name": "Invierno 2024",
//           "url": "season/invierno-2024/"
//       }
//   ],
//   "genres": [
//       {
//           "name": "Escolares",
//           "url": "genres/escolares/"
//       },
//       {
//           "name": "Romance",
//           "url": "genres/romance/"
//       },
//       {
//           "name": "Shounen",
//           "url": "genres/shounen/"
//       }
//   ],
//   "director": [
//       {
//           "name": "Akagi Hiroaki",
//           "url": "director/akagi-hiroaki/"
//       }
//   ],
//   "lastUpdate": "enero 20, 2024",
//   "censured": "Censurada",
//   "type": "Anime",
//   "publicationDate": "agosto 22, 2023",
//   "status": "En emisión"
// }

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
  lastChapter!: number;
  lastChapterImg!: string;
  lastChapterDate!: string;
}