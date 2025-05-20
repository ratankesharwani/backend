import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: { username: string, password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('verify-password/:id')
  async verifyPassword(
    @Param('id') id: number,
    @Body('password') password: string,
  ) {
    return this.authService.verifyPasswordById(id, password);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.username, body.password);
  }
}