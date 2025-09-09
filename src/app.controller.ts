import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { NumVerifyResponse } from './types/num-verify.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('verify-number')
  verifyNumber(
    @Query('number') number: string,
    @Query('country_code') countryCode?: string,
  ): Promise<string | NumVerifyResponse> {
    return this.appService.verifyNumber(number, countryCode || 'FR');
  }
}
