import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Milestone } from './milestone.entity';
import { ProjectsService } from './project.service';
import { ProjectsController } from './project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Milestone])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectModule {}