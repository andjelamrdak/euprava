import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
@Entity()
export class CriminalProceeding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  beginDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column()
  accusation: string;

  @Column({ nullable: true })
  judgment: string;

  @Column({ default: false })
  convicted: boolean;

  @Column()
  severity: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (u) => u.criminalProceedings)
  @JoinColumn({ name: "userId" })
  user: User;
}
