import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  public keyApi: string;

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    this.keyApi = this.configService.get<string>('GOOGLE_API_KEY');
  }

  async getHello(): Promise<string> {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    if (!databaseUrl) {
      return 'DATABASE_URL is not configured in .env file.';
    }

    try {
      // Teste de conexão com o banco de dados
      await this.prismaService.$queryRaw`SELECT 1`;
      return (
        'Hello World! Database connection successful. API Key: ' + this.keyApi
      );
    } catch (error) {
      return (
        'Hello World! Failed to connect to the database. Error: ' +
        error.message
      );
    }
  }
}
