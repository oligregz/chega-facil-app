import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerCreateBodyDTO } from './dtos/CustomerCreateBodyDTO';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async list() {
    return await this.customersService.findAll();
  }

  @Post()
  async create(@Body() data: CustomerCreateBodyDTO) {
    return await this.customersService.create(data);
  }
}
