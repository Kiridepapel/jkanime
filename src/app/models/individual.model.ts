export class ChapterDataDTO {
  imgUrl!: string;
  chapter!: string;
  name?: string;
  date?: string;
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

export class LastAnimeDataDTO {
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
