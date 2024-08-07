import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
