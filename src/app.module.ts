import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Milestone } from './project/milestone.entity';
import { User } from './auth/user.entity';
import { Project } from './project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'dev_dashboard',
      entities: [User, Project, Milestone],
      synchronize: true,
    }),
    AuthModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
