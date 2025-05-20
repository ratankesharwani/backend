import { User } from "src/auth/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Milestone } from "./milestone.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text', { array: true })
  techStack: string[];

  @Column()
  estimatedDuration: number;

  @Column({ nullable: true })
  logoPath: string;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @OneToMany(() => Milestone, milestone => milestone.project, { cascade: true })
  milestones: Milestone[];
}