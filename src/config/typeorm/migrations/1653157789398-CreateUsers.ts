import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1653157789398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      full_name varchar(255) NOT NULL,
      email varchar(255) NOT NULL UNIQUE,
      cpf varchar(255) NOT NULL UNIQUE,
      password varchar(255) NOT NULL,
      is_admin boolean DEFAULT false,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp DEFAULT CURRENT_TIMESTAMP
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}
