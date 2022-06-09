import { hashSync } from 'bcrypt';
import { UsersEntity } from '../../../app/users/users.entity';
import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const adminPassword = process.env.ADMIN_PASSWORD;
const hashedPassword = hashSync(adminPassword, 10);

export class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await getManager().query(
      `DELETE FROM users WHERE email = '${process.env.ADMIN_EMAIL}';`,
    );

    await connection
      .createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values([
        {
          fullName: process.env.ADMIN_FULL_NAME,
          email: process.env.ADMIN_EMAIL,
          cpf: process.env.ADMIN_CPF,
          password: `${hashedPassword}`,
          isAdmin: true,
        },
      ])
      .execute();
  }
}
