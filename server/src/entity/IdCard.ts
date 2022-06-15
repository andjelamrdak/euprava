import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { User } from "./User";
@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (u) => u.idCards)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  duration: number;

  @Column()
  placeIfIssue: string;

  @Column()
  dateOfIssue: Date;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column({ default: false })
  lostOrStolen: boolean;
}
