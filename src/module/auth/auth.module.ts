import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserProvider } from 'src/providers/user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [...UserProvider, AuthServices],
})
export class AuthModule {}
