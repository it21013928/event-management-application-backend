import { IsEmail, IsString, IsNotEmpty } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PartialType(User) {
  @IsString()
  readonly username?: string;

  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsString()
  password?: string;
}
