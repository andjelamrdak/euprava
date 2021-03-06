import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1656260988963 implements MigrationInterface {
    name = 'createUser1656260988963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`admin\` tinyint NOT NULL DEFAULT 0, \`blocked\` tinyint NOT NULL DEFAULT 0, \`jmbg\` bigint NOT NULL, \`idCardNumber\` bigint NULL, \`address\` varchar(255) NULL, \`city\` varchar(255) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
