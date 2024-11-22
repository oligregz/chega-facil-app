import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private configService;
    keyApi: string;
    constructor(configService: ConfigService);
    getHello(): string;
}
