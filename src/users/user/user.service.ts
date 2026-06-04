import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../DTO/create-user.dto';
import { UpdateUserDto } from '../DTO/update-user.dto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel(User.name) private userModel: Model<User>) {}

async create(createUserDto: CreateUserDto,): Promise<User> {
  const user = new this.userModel( createUserDto);

  return await user.save();
}

async getUsers(): Promise<User[]> {
  return this.userModel.find();
}

async getUser(id:string): Promise<User>{

const isValid = mongoose.Types.ObjectId.isValid(id);
  if(!isValid){
     throw new NotFoundException(
      'Invalid User Id',
    );
  }

 const user =  await this.userModel.findById(id);
 if(!user){
  throw new NotFoundException(
      'User not found',
    );
 }
 return user;
}

async updateUser( id: string,updateUserDto: UpdateUserDto): Promise<User> {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if(!isValid){
     throw new NotFoundException(
      'Invalid User Id',
    );
  }

  const updatedUser = await this.userModel.findByIdAndUpdate(id,updateUserDto,
    { new: true });
//{new: true}==> The new version will be restored to me after modification.
//{new: false}==> the old version will be restored before the modification 
  if(!updatedUser){
      throw new NotFoundException(
      'User Not Found',
    );
  }

  
  return updatedUser;
}

async deleteUser(id: string) {
  return await this.userModel.findByIdAndDelete(id);
}

async searchUsers(username: string): Promise<User[]> {
  return this.userModel.find({
    username: {
      $regex: username,
      $options: 'i',
    }
  });
}
}