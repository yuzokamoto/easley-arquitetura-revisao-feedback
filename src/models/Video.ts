export interface VideoDB {
  id: string,
  creator_id: string,
  title: string,
  video_url: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string
}

export interface LikeDislikeDB {
  user_id: string,
  video_id: string,
  like: number
}

export interface VideoModel {
  id: string,
  creatorId: string,
  title: string,
  videoUrl: string,
  likes: number,
  dislikes: number,
  createdAt: string,
  updatedAt: string
}

export class Video {
  constructor(
    private id: string,
    private creator_id: string,
    private title: string,
    private video_url: string,
    private likes: number,
    private dislikes: number,
    private created_at: string,
    private updated_at: string
  ) {}

  public getId(): string {
    return this.id
  }

  public setId(value: string): void {
    this.id = value
  }

  public getCreatorId(): string {
    return this.creator_id
  }

  public setCreatorId(value: string): void {
    this.creator_id = value
  }

  public getTitle(): string {
    return this.title
  }

  public setTitle(value: string): void {
    this.title = value
  }

  public getVideoUrl(): string {
    return this.video_url
  }

  public setVideoUrl(value: string): void {
    this.video_url = value
  }

  public getLikes(): number {
    return this.likes
  }

  public setLikes(value: number): void {
    this.likes = value
  }

  public getDislikes(): number {
    return this.dislikes
  }

  public setDislikes(value: number): void {
    this.dislikes = value
  }

  public getCreatedAt(): string {
    return this.created_at
  }

  public setCreatedAt(value: string): void {
    this.created_at = value
  }

  public getUpdatedAt(): string {
    return this.updated_at
  }

  public setUpdatedAt(value: string): void {
    this.updated_at = value
  }

  public addLike(): void {
    this.likes++
  }

  public removeLike(): void {
    this.likes--
  }

  public addDislike(): void {
    this.dislikes++
  }

  public removeDislike(): void {
    this.dislikes--
  }
}