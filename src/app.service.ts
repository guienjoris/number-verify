/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { NumVerifyResponse } from './types/num-verify.types';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async verifyNumber(
    number: string,
    countryCode: string,
  ): Promise<string | NumVerifyResponse> {
    const response: { data: NumVerifyResponse } = await firstValueFrom(
      this.httpService.get(
        `http://apilayer.net/api/validate?access_key=${process.env.API_LAYER_ACCESS_KEY}&number=${number}&country_code=${countryCode}&format=1`,
      ),
    );

    if (response.data.valid) {
      return response.data;
    } else {
      return 'Number or country_code is not valid or is not supported';
    }
  }
}
