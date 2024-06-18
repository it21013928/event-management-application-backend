import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
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

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).select('+password');
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    const users = await this.userModel.find().select('-password').exec();
    this.logger.log(`Found ${users.length} users`);
    return users;
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).select('-password');
  }

  async deactivate(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).select('-password');
    return await this.userModel
      .findByIdAndUpdate(id, { isActive: !user.isActive })
      .select('-password');
  }

  async remove(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async userLogin(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).select('+password');
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
