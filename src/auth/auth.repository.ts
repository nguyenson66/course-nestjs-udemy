import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async registerUser(register: UserDto): Promise<User> {
    const { username, password } = register;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const auth = this.create({
      username,
      password: hashedPassword,
    });

    try {
      const result = await this.save(auth);

      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new NotFoundException(`Username already exists !!!`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
