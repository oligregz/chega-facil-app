import { PrismaClient } from '@prisma/client';
import { jsonReader } from 'utils/jsonReader';

const prisma = new PrismaClient();

async function shouldSeedDatabase(): Promise<boolean> {
  const customerCount = await prisma.customer.count();
  const driverCount = await prisma.driver.count();

  return customerCount === 0 && driverCount === 0;
}

export async function main() {
  const seedRequired = await shouldSeedDatabase();

  if (seedRequired) {
    // Get json data
    const pathFile = 'seed.json';
    const nameFile = 'utils';
    const data = await jsonReader(nameFile, pathFile);

    let accCustomers = 0;
    let accDrivers = 0;

    // Create customers
    for (const customerData of data.customers) {
      try {
        // Verify if exists
        const existingCustomer = await prisma.customer.findFirst({
          where: {
            AND: [
              { name: customerData.name },
              { email: customerData.email },
              { phone: customerData.phone },
            ],
          },
        });

        if (existingCustomer) {
          // Update if exists
          const customer = await prisma.customer.update({
            where: { id: existingCustomer.id },
            data: { isActive: customerData.isActive },
          });
          console.log(`Customer ${customer.name} updated`);
        } else {
          // Create if not exists
          const customer = await prisma.customer.create({
            data: {
              name: customerData.name,
              email: customerData.email,
              phone: customerData.phone,
              isActive: customerData.isActive,
            },
          });
          console.log(`Customer ${customer.name} created`);
        }
        accCustomers++;
      } catch (error) {
        console.error('Error creating or updating customer:', error);
      }
    }

    // Create drivers
    for (const driverData of data.drivers) {
      try {
        // Verify if exists
        const existingDriver = await prisma.driver.findFirst({
          where: {
            AND: [
              { name: driverData.name },
              { email: driverData.email },
              { phone: driverData.phone },
            ],
          },
        });

        if (existingDriver) {
          // Update if exists
          const driver = await prisma.driver.update({
            where: { id: existingDriver.id },
            data: {
              vehicle: driverData.vehicle,
              description: driverData.description,
              lastComment: driverData.lastComment,
              rating: driverData.rating,
              rate: driverData.rate,
              minimumDistance: driverData.minimumDistance,
              isActive: driverData.isActive,
            },
          });
          console.log(`Driver ${driver.name} updated`);
        } else {
          // Create if not exists
          const driver = await prisma.driver.create({
            data: {
              name: driverData.name,
              email: driverData.email,
              phone: driverData.phone,
              vehicle: driverData.vehicle,
              description: driverData.description,
              lastComment: driverData.lastComment,
              rating: driverData.rating,
              rate: driverData.rate,
              minimumDistance: driverData.minimumDistance,
              isActive: driverData.isActive,
            },
          });
          console.log(`Driver ${driver.name} created`);
        }
        accDrivers++;
      } catch (error) {
        console.error('Error creating or updating driver:', error);
      }
    }

    console.log(
      `${accCustomers} Customers and ${accDrivers} Drivers processed in database`,
    );
  }
}

// Execute seed function
main()
  .catch((e) => {
    console.error('An error occurred during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
