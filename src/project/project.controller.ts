import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './project.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) { }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @Post()
  async create(@Body() projectData: any) {
    try {
      const result = await this.projectsService.create(projectData);
      return {
        status: 'success',
        message: 'Project created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'Something went wrong while creating the project',
          error: error?.response || null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() projectData: any) {
    try {
      const result = await this.projectsService.update(id, projectData);
      return {
        status: 'success',
        message: 'Project updated successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'Something went wrong while updating the project',
          error: error?.response || null,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
}