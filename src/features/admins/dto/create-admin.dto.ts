import { IsEmail, IsString, IsNotEmpty } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Admin } from '../entities/admin.entity';

export class CreateAdminDto extends PartialType(Admin) {
  @IsString()
  readonly username?: string;

  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsString()
  password?: string;
}
