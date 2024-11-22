import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  public keyApi: string;

  constructor(private configService: ConfigService) {
    this.keyApi = this.configService.get<string>('GOOGLE_API_KEY');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
