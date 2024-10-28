import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class DbMigration1730132412714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'document',
            type: 'int',
          },
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'token',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'wallet',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'document',
            type: 'int',
          },
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'phone',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'document',
            type: 'int',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payments');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('wallet');
  }
}
