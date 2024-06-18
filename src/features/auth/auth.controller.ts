import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AdminLocalAuthGuard } from './admin-local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('user-login')
  async userLogin(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(AdminLocalAuthGuard)
  @Post('admin-login')
  async adminLogin(@Request() req) {
    return this.authService.login(req.user);
  }
}
