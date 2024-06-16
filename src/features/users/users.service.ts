import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    const userObj = newUser.toObject();
    delete userObj.password;
    return userObj as User;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password');
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).select('-password');
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password');
  }

  async remove(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async userLogin(username: string, password: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ username })
      .select('+password');

    if (!user) {
      return null;
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return null;
    }

    const userObj = user.toObject();
    delete userObj.password;

    return userObj as User;
  }
}
