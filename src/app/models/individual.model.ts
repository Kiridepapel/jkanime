export class ChapterDataDTO {
  name?: string;
  imgUrl!: string;
  type?: string;
  chapter!: string;
  date?: string;
  time?: string;
  url!: string;
  state?: boolean;
}

export class TopDataDTO {
  name!: string;
  imgUrl!: string;
  likes!: number;
  position!: number;
  url!: string;
}

export class AnimeDataDTO {
  name!: string;
  imgUrl!: string;
  url!: string;
  state!: string;
  type!: string;
}

export class LinkDTO {
  name!: string;
  url!: string;
}
