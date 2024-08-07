import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { WebResponse } from './model/web.model';
import { DataResponse } from './model/data.model';
import { NotFoundExceptionFilter } from './common/filter/zod.filter';

@Controller('datas')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseFilters(NotFoundExceptionFilter)
  @Get()
  async getDatas(@Query('year') year: string): Promise<WebResponse<DataResponse[]>> {
      const action = await this.appService.getData(year);

      return {
        data : action
      }
  }
}
