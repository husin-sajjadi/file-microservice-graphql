import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'your_db_username',
  password: 'your_db_password',
  entityPrefix: 'f_',
  database: 'your_own_db',
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['**/src/db/migrations/*.js']
  //cli: { migrationsDir: 'src/db/migrations' },
};
export default config;

// const config: MysqlConnectionOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'your_db_user_name',
//   password: 'your_db_user_password',
//   entityPrefix: 'file_',
//   database: 'file_microservice_db',
//   logging: false,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   synchronize: true,
//   migrations: ['**/src/db/migrations/*.js'],
//   //cli: { migrationsDir: 'src/db/migrations' },
// };
// export default config;
