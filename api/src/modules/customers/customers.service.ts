import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { AppError } from 'src/errors/app-error';
import { CustomerDTO } from './customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const customers = await this.prisma.customer.findMany();

    if (customers.length === 0)
      throw new AppError('Customer alerady exists', 404);

    return customers;
  }

  async findById(data: CustomerDTO) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: data.id,
      },
    });

    return customer;
  }

  async findCustomer(data: CustomerDTO) {
    const { name, phone, email, isActive } = data;
    const customer = await this.prisma.customer.findFirst({
      where: {
        name,
        phone,
        email,
        isActive,
      },
    });

    return customer;
  }

  async create(data: CustomerDTO) {
    const hasCustomer = await this.findCustomer(data);

    if (hasCustomer) throw new AppError('Customer alerady exists', 409);

    const customer = await this.prisma.customer.create({
      data,
    });

    return customer;
  }
}
