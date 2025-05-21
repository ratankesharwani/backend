import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { Milestone } from './milestone.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Milestone) private milestoneRepo: Repository<Milestone>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  findAll() {
    return this.projectRepo.find({ relations: ['milestones', 'user'] });
  }

  findOne(id: number) {
    return this.projectRepo.findOne({ where: { id }, relations: ['milestones', 'user'] });
  }

 async create(projectData: any) {
    try {
      if (!projectData.userId) {
        throw new BadRequestException('User ID is required');
      }

      const user = await this.userRepo.findOne({ where: { id: projectData.userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${projectData.userId} not found`);
      }

      if (typeof projectData.tech_stack === 'string') {
        projectData.tech_stack = projectData.tech_stack
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean);
      }

      const project = this.projectRepo.create({
        ...projectData,
        user,
      });

      return await this.projectRepo.save(project);
    } catch (error) {
      // Re-throw to controller to handle consistently
      throw error;
    }
  }


  async update(id: number, projectData: any) {
    await this.projectRepo.update(id, projectData);
    return this.projectRepo.findOne({ where: { id }, relations: ['milestones'] });
  }

  async remove(id: number) {
    return this.projectRepo.delete(id);
  }
}