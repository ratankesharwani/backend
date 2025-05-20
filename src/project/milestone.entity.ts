import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Milestone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => Project, project => project.milestones)
  project: Project;
}