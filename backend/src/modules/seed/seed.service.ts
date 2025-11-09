import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  async seedUser() {
    const testUser = {
      username: 'testuser',
      password: 'password123',
      url_wallet: 'https://ilp.interledger-test.dev/testuser',
    };

    try {
      const user = await this.usersService.create(testUser);
      return {
        message: 'Usuario de prueba creado exitosamente',
        user,
      };
    } catch (error) {
      if (error.message?.includes('ya existe')) {
        return {
          message: 'El usuario de prueba ya existe',
          error: error.message,
        };
      }
      throw error;
    }
  }
}
