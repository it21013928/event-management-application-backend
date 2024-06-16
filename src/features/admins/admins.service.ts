import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { UpdateAdminDto } from '../admins/dto/update-admin.dto';
import { Admin } from '../admins/entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = new this.adminModel(createAdminDto);
    await newAdmin.save();
    const adminObj = newAdmin.toObject();
    delete adminObj.password;
    return adminObj as Admin;
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find().select('-password');
  }

  async findOne(id: string): Promise<Admin | null> {
    return await this.adminModel.findById(id).select('-password');
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin | null> {
    if (updateAdminDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, salt);
    }
    return await this.adminModel
      .findByIdAndUpdate(id, updateAdminDto, { new: true })
      .select('-password');
  }

  async remove(id: string): Promise<any> {
    return await this.adminModel.findByIdAndDelete(id);
  }

  async adminLogin(username: string, password: string): Promise<Admin | null> {
    const admin = await this.adminModel
      .findOne({ username })
      .select('+password');

    if (!admin) {
      return null;
    }

    const isPasswordValid = await admin.validatePassword(password);
    if (!isPasswordValid) {
      return null;
    }

    const adminObj = admin.toObject();
    delete adminObj.password;

    return adminObj as Admin;
  }
}
