import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { Milestone } from './milestone.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Milestone) private milestoneRepo: Repository<Milestone>
  ) {}

  findAll() {
    return this.projectRepo.find({ relations: ['milestones', 'user'] });
  }

  findOne(id: number) {
    return this.projectRepo.findOne({ where: { id }, relations: ['milestones', 'user'] });
  }

  async create(projectData: any) {
    const project = this.projectRepo.create(projectData);
    return this.projectRepo.save(project);
  }

  async update(id: number, projectData: any) {
    await this.projectRepo.update(id, projectData);
    return this.projectRepo.findOne({ where: { id }, relations: ['milestones'] });
  }

  async remove(id: number) {
    return this.projectRepo.delete(id);
  }
}