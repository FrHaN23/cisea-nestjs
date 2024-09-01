import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/module/auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { DistrictModule } from '../district/district.module';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CategoryModule,
    DistrictModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
