import { MigrationInterface, QueryRunner } from "typeorm";

export class createIdCard1656261096386 implements MigrationInterface {
    name = 'createIdCard1656261096386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`id_card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`duration\` int NOT NULL, \`placeIfIssue\` varchar(255) NOT NULL, \`dateOfIssue\` datetime NOT NULL, \`city\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`lostOrStolen\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`id_card\` ADD CONSTRAINT \`FK_1a242b1783ab7420f4ae891a7d5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`id_card\` DROP FOREIGN KEY \`FK_1a242b1783ab7420f4ae891a7d5\``);
        await queryRunner.query(`DROP TABLE \`id_card\``);
    }

}
