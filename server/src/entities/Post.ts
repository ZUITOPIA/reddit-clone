import { Exclude, Expose } from "class-transformer";
import { ValidationTypes } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { makeId, slugify } from "../utils/helpers";
import { User } from "./User";

@Entity("post")
export default class Post extends BaseEntity {
  @Index()
  @Column()
  identifier: string; // 식별자 랜덤 생성

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column()
  subName: string;

  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @Exclude() // 프론트로 넘겨줄 때 얘는 빼고 주자
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Exclude() // 프론트로 넘겨줄 때 얘는 빼고 주자
  @OneToMany(() => ValidationTypes, (vote) => vote.post)
  @Expose()
  get url(): string {
    return `/r/${this.subName}/${this.identifier}/${this.slug})`;
  }

  @Expose() // expose 없으면 프론트에서 URL 정보를 받을 수 없음!
  get commentCount(): number {
    return this.comments?.length;
  }

  @Expose() // expose 없으면 프론트에서 URL 정보를 받을 수 없음!
  get voteScore(): number {
    return this.votes?.reduce((memo, curt) => memo + (curt.value || 0), 0);
  }

  protected userVote: number;

  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}

// 여기서 잠깐, slug 란 ?
// 페이지나 포스트를 설명하는 핵심 단어의 집합, 조사/전치사/쉼표/마침표 등을 빼고 띄어쓰기는 하이픈(-)으로 대체해서 만들어 URL에 사용
// 슬러그를 URL에 사용함으로써 검색 엔진에서 더 빨리 페이지를 찾아주고 검색 엔진의 정확도를 높여줌
