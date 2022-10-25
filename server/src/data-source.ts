import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  synchronize: true, // 개발환경에서만 true로 설정해줌
  logging: false,
  entities: ["./src/entities/**/*.ts"],
  migrations: [],
  subscribers: [],
});
