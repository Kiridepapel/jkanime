// Data
export class Mode {
  value!: any;
  icon?: string;
  styles?: string;
}

export class AnimeDataDTO {
  name!: string;
  imgUrl!: string;
  url!: string;
  state!: string;
  type!: string;
}

// Anime
export class ChapterDataDTO {
  name?: string;
  imgUrl!: string;
  chapter!: string;
  date?: string;
  time?: string;
  url!: string;
  type?: string;
  state?: boolean | string;
}

export class TopDataDTO {
  name!: string;
  imgUrl!: string;
  likes!: number;
  position!: number;
  url!: string;
  // Extras for section TOP
  type?: string;
  chapters?: number;
  synopsis?: string;
  synopsisEnglish?: string;
}

export class LinkDTO {
  name!: string;
  url!: string;
}
