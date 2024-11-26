import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { AppError } from 'src/errors/app-error';
import { Customer } from '@prisma/client';
import { CustomerCreateBodyDTO } from './dtos/CustomerCreateBodyDTO';
import { ERROR } from 'src/errors/errors';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();

    if (customers.length === 0) {
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_NOT_FOUND.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_NOT_FOUND.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_NOT_FOUND.STATUS,
      );
    }

    return customers;
  }

  async findCustomer(data: CustomerCreateBodyDTO): Promise<Customer> {
    const { name, phone, email, isActive } = data;

    const customer = await this.prisma.customer.findFirst({
      where: {
        name,
        phone,
        email,
        isActive,
      },
    });

    if (customer) {
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_ALREADY_EXISTS.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_ALREADY_EXISTS.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_ALREADY_EXISTS.STATUS,
      );
    }

    return customer;
  }

  async create(data: CustomerCreateBodyDTO): Promise<Customer> {
    const hasCustomer = await this.findCustomer(data);
    if (hasCustomer) {
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_ALREADY_EXISTS.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_ALREADY_EXISTS.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.CUSTOMER_ALREADY_EXISTS.STATUS,
      );
    }

    const customer = await this.prisma.customer.create({
      data,
    });

    return customer;
  }
}
