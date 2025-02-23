import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameAndPriceIndexes1740300971460 implements MigrationInterface {
    name = 'AddNameAndPriceIndexes1740300971460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_resources_name_unique" ON "resources" ("name") `);
        await queryRunner.query(`CREATE INDEX "idx_resources_price" ON "resources" ("price") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_resources_price"`);
        await queryRunner.query(`DROP INDEX "public"."idx_resources_name_unique"`);
    }

}
