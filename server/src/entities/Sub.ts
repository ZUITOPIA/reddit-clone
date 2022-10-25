import { Expose } from "class-transformer";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity("subs")
export default class Sub extends BaseEntity {
  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" }) // 외래 키 속성명 : name(line32), 참조 엔터티의 참조 속성명 : referencedColumnName(User.ts 내부)
  user: User;

  @OneToMany(() => postMessage, (post) => post.sub)
  post: Post[];

  @Expose()
  get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : "https://www.gravatar.com/avatar?d=mp&=y";
  }

  @Expose()
  get bannerUrl(): string | undefined {
    return this.bannerUrn
      ? `${process.env.APP_URL}/images/${this.bannerUrn}`
      : undefined;
  }
}

// URI(identifier, 자원의 식별자) = URL(locator, 자원의 위치로 자원을 식별) + URN(name, 고유한 이름으로 자원을 식별)
// URI : Protocol - Domain Name - Port - Path To The File - Parameters
// URL : Protocol - Domain Name - Port - Path To The File
// e.g. http://zuitopia.com/author/hello.html#posts -> 전체는 URI
// URL은 http://zuitopia.com/author/hello.html -> resource 없음 (#posts)
// URN은 zuitopia.com/author/hello.html -> method 없음 (http)
