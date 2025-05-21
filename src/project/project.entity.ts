import { User } from 'src/auth/user.entity';
import { Milestone } from './milestone.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('simple-array', { nullable: true })
  tech_stack: string[];

  @Column({ nullable: true })
  estimated_duration: number;

  @Column({ nullable: true })
  logo_path: string;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @OneToMany(() => Milestone, milestone => milestone.project, { cascade: true, eager: true })
  milestones: Milestone[];
}