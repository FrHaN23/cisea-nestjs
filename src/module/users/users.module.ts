import { Module } from '@nestjs/common';
import { CategoryController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './users.service';
import { UserProvider } from 'src/providers/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...UserProvider, UserService],
})
export class UserModule {}
