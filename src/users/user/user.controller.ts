import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Query
} from '@nestjs/common';

import { UsersService } from './user.service';
import { CreateUserDto } from '../DTO/create-user.dto';
import path from 'path';
import { UpdateUserDto } from '../DTO/update-user.dto';
import { MESSAGES } from '@nestjs/core/constants';



@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create( @Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);

    return {
      message: 'User added successfully'
    };
  }


  @Get()
async getUsers() {
  return await this.usersService.getUsers();
}

@Get('search')
async searchUsers(@Query('username') username: string,) {
  return this.usersService.searchUsers(username);
}
@Get(':id')
async getUser(@Param('id') id: string) {
  return this.usersService.getUser(id);
}

@Patch(':id')
async updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto){
    await this.usersService.updateUser(id,UpdateUserDto);

   const updatedFields =Object.keys(UpdateUserDto);
return {
  message: `${updatedFields.join(', ')} updated successfully`,
  user: UpdateUserDto,
};
}

@Delete(':id')
async deleteUser(@Param('id') id:string){
  await this.usersService.deleteUser(id);
  return{
    message:'User Deleted successfully'
  }
}


}