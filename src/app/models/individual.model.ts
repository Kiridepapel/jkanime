export class ChapterDTO {
  imgUrl!: string;
  chapter!: string;
  name?: string;
  date?: string;
  url!: string;
}

export class TopDTO {
  name!: string;
  imgUrl!: string;
  likes!: number;
  position!: number;
  url!: string;
}

export class LastAnimeInfoDTO {
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
