import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { handleError } from '../../errors/app-error';
import { response } from 'express';
import { CustomerCreateBodyDTO } from './dtos/CustomerCreateBodyDTO';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async list() {
    try {
      return this.customersService.findAll();
    } catch (error) {
      handleError(error, response);
    }
  }

  @Post()
  async create(@Body() data: CustomerCreateBodyDTO) {
    try {
      return this.customersService.create(data);
    } catch (error) {
      handleError(error, response);
    }
  }
}
