import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { EncryptionTransformer } from "typeorm-encrypted";
import { User } from './User';
@Entity()
export class CriminalProceeding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  beginDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: false })
  accusation: string;

  @Column({ nullable: false })
  judgment: string;

  @Column({ default: false })
  convicted: boolean;

  @Column({ default: false })
  severity: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (u) => u.criminalProceedings)
  @JoinColumn({ name: "userId" })
  user: User;
}
