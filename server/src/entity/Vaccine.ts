import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { User } from "./User";
@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateOfVaccintaion: Date;

  @Column()
  disease: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (u) => u.vaccines)
  @JoinColumn({ name: "userId" })
  user: User;
}
