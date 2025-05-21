import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const existing = await this.userRepository.findOne({ where: { username } });
    if (existing) {
      throw new UnauthorizedException('User already exists');
    }

    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ username, password: hashed });
      await this.userRepository.save(user);
      return this.login(user);
    } catch (error) {
      throw new BadRequestException('Failed to hash password');
    }
  }

  async verifyPasswordById(id: number, password: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return { message: 'Password is valid', userId: user.id };
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users.map(({ password, ...rest }) => rest); // omit password
  }

}