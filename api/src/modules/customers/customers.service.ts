import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { AppError } from 'src/errors/app-error';
import { Customer } from '@prisma/client';
import { CustomerCreateBodyDTO } from './dtos/CustomerCreateBodyDTO';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();

    if (customers.length === 0) {
      throw new AppError('NOT_FOUND', 'Clientes não encontrados', 404);
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
      throw new AppError('ALREADY_EXISTS', 'Esse cliente já existe', 409);
    }

    return customer;
  }

  async create(data: CustomerCreateBodyDTO): Promise<Customer> {
    const hasCustomer = await this.findCustomer(data);
    if (hasCustomer) {
      throw new AppError('ALREADY_EXISTS', 'Esse cliente já existe', 409);
    }

    const customer = await this.prisma.customer.create({
      data,
    });

    return customer;
  }
}
