import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './project.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() projectData: any) {
    return this.projectsService.create(projectData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() projectData: any) {
    return this.projectsService.update(id, projectData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
}