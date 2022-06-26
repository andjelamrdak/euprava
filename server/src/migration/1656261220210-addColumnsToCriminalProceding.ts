import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnsToCriminalProceding1656261220210 implements MigrationInterface {
    name = 'addColumnsToCriminalProceding1656261220210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`criminal_proceeding\` (\`id\` int NOT NULL AUTO_INCREMENT, \`beginDate\` datetime NOT NULL, \`endDate\` datetime NULL, \`accusation\` varchar(255) NOT NULL, \`judgment\` varchar(255) NULL, \`convicted\` tinyint NOT NULL DEFAULT 0, \`severity\` int NOT NULL DEFAULT 0, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`criminal_proceeding\` ADD CONSTRAINT \`FK_de1df851857fbb16e445bbd6265\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`criminal_proceeding\` DROP FOREIGN KEY \`FK_de1df851857fbb16e445bbd6265\``);
        await queryRunner.query(`DROP TABLE \`criminal_proceeding\``);
    }

}
