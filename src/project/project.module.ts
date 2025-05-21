import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Milestone } from './milestone.entity';
import { ProjectsService } from './project.service';
import { ProjectsController } from './project.controller';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Milestone,User])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectModule {}