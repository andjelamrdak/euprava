import { MigrationInterface, QueryRunner } from "typeorm";

export class createVaccine1656261053132 implements MigrationInterface {
    name = 'createVaccine1656261053132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vaccine\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dateOfVaccintaion\` datetime NOT NULL, \`disease\` varchar(255) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD CONSTRAINT \`FK_52ddcf5fd9c977edfd4b386fc45\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP FOREIGN KEY \`FK_52ddcf5fd9c977edfd4b386fc45\``);
        await queryRunner.query(`DROP TABLE \`vaccine\``);
    }

}
