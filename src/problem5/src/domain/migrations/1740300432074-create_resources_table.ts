import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResourcesTable1740300432074 implements MigrationInterface {
    name = 'CreateResourcesTable1740300432074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resources" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "quantity" bigint NOT NULL DEFAULT '0', "price" numeric(10,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "resources"`);
    }

}
