import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerCreateBody } from './dtos/CustomerCreateBody';
import { handleError } from '../../errors/app-error';
import { response } from 'express';

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
  async create(@Body() data: CustomerCreateBody) {
    try {
      return this.customersService.create(data);
    } catch (error) {
      handleError(error, response);
    }
  }
}
