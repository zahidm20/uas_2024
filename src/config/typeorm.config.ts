import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306, //port default 3306 lihat xampp
  username: 'root', // username default xampp root
  password: '', // password default xampp string kosong
  database: 'project_kasir',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT), //port default 3306 lihat xampp
//   username: process.env.DB_USERNAME, // username default xampp root
//   password: process.env.DB_PASSWORD, // password default xampp string kosong
//   database: process.env.DB_DATABASE,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   synchronize: true,
//   logging:true,
// };
