import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 33061,
  username: "root",
  password: "Jabuka123.",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  database: "euprava",
  synchronize: true
})