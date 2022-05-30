import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1653157789398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE role_options AS ENUM ('owner', 'admin');
    CREATE TABLE users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      full_name varchar(255) NOT NULL,
      email varchar(255) NOT NULL UNIQUE,
      cpf varchar(255) NOT NULL UNIQUE,
      password varchar(255) NOT NULL,
      role role_options DEFAULT 'owner',
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users; DROP TYPE role_options');
  }
}
