import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { IdCard } from "./IdCard";
import { Vaccine } from './Vaccine';
import { CriminalProceeding } from './CriminalProceeding';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({
    select: false,
    transformer: new EncryptionTransformer({
      key: "e41c966f21f9e157780246fff924e6a3feddd751f201304213b2f845d8841a61",
      algorithm: "aes-256-cbc",
      ivLength: 16,
      iv: "ff5ac19190424b1d88f9419ef949ae56",
    }),
  })
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  blocked: boolean;

  @Column({ nullable: false, type: `bigint` })
  jmbg: string;

  @Column({ nullable: true, type: `bigint` })
  idCardNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @OneToMany(() => IdCard, (p) => p.user)
  idCards: IdCard[];

  @OneToMany(() => Vaccine, (p) => p.user)
  vaccines: Vaccine[];

  @OneToMany(() => CriminalProceeding, (p) => p.user)
  criminalProceedings: CriminalProceeding[];
}
