import { Exclude, Expose } from "class-transformer";
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
import { makeId } from "../utils/helpers";
import Post from "./Post";
import { User } from "./User";
import Vote from "./Vote";

@Entity("comment")
export default class Comment extends BaseEntity {
  @Index()
  @Column()
  identifier: string;

  @Column()
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User) // comment 작성하는 사람
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.comment, { nullable: false })
  post: Post;

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment)
  vote: Vote[];

  protected userVote: number;

  setUserVote(user: User) {
    const index = this.vote?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.vote[index].value : 0;
  }

  @Expose() get voteScore(): number {
    const initialValue = 0;
    return this.vote?.reduce(
      (previousValue, currentObject) =>
        previousValue + (currentObject.value || 0),
      initialValue
    );
  }

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8);
  }
}
