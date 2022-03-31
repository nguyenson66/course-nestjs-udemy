import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { UserRepository } from './auth.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { jwtUser } from './JWT-user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private authRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registerUser(register: UserDto): Promise<User> {
    return this.authRepository.registerUser(register);
  }

  async loginUser(userLogin: LoginUserDto): Promise<{ accessToken: string }> {
    const { username, password } = userLogin;

    const user = await this.authRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userPayload: jwtUser = { username };

      const accessToken: string = this.jwtService.sign(userPayload);

      return { accessToken };
    } else {
      throw new NotFoundException('Username or password wrong !!!');
    }
  }
}
