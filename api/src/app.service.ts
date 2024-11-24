import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  public keyApi: string;
  public resConnection: number;

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    this.keyApi = this.configService.get<string>('GOOGLE_API_KEY');
  }

  async getHello(): Promise<object> {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    let res: any;
    if (!databaseUrl) {
      return {
        message: 'DATABASE_URL is not configured in .env file.',
      };
    }

    try {
      res = await this.prismaService.$queryRaw`SELECT 1`;
      const columnValue = res.length > 0 ? res[0]['?column?'] : null;
      this.resConnection = columnValue;
      return {
        message: `Api running with status: ${this.resConnection}`,
      };
    } catch (error) {
      console.log(this.resConnection, res);
      return {
        message: `Api running with status: ${this.resConnection}`,
        error: error.message,
      };
    }
  }
}
