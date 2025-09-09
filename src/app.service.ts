import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async verifyNumber(number: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.get(
        `http://apilayer.net/api/validate?access_key=${process.env.API_LAYER_ACCESS_KEY}&number=${number}&country_code=FR&format=1`,
      ),
    );

    console.log({ response });

    if (response.data.valid) {
      return response.data;
    } else {
      return 'Number is not valid or not supported';
    }
  }
}
