import { HttpException, Injectable } from '@nestjs/common';
import { DataResponse } from './model/data.model';
import { PrismaService } from './prisma/prisma.service';
import { ValidationService } from './common/validation/validation.service';
import { AppValidation } from './app.validation';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService
  ) {}

  async getData(year: string): Promise<DataResponse[]> {
    const requestYear: string = this.validationService.validate(AppValidation.YEAR, year);
  
    const tableName = `table_${requestYear}`;
  
    if (!this.prismaService[tableName]) {
      throw new HttpException('Resource you are requesting is not found', 404);
    }
  
    const datas = await this.prismaService[tableName].findMany();
  
    if (datas.length === 0) {
      throw new HttpException('Resource you are requesting is not found', 404);
    }
  
    return datas;
  }
  
}
