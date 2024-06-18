import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.userLogin(username, pass);
    return user;
  }
  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.adminsService.adminLogin(username, pass);
    return admin;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
