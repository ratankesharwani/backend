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
      throw error;
    }
  }


  async update(id: number, projectData: any) {
  try {
    const existingProject = await this.projectRepo.findOne({ where: { id } });
    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (projectData.userId) {
      const user = await this.userRepo.findOne({ where: { id: projectData.userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${projectData.userId} not found`);
      }
      projectData.user = user;
    }

    if (typeof projectData.tech_stack === 'string') {
      projectData.tech_stack = projectData.tech_stack
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    // Merge existing data and update fields
const updatedProject = this.projectRepo.merge(existingProject, projectData);

// Save updates — this handles relations too
await this.projectRepo.save(updatedProject);

    return await this.projectRepo
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.user', 'user')
      .leftJoinAndSelect('project.milestones', 'milestones')
      .where('project.id = :id', { id })
      .getOne();
  } catch (error) {
    throw error;
  }
}


  async remove(id: number) {
    return this.projectRepo.delete(id);
  }
}