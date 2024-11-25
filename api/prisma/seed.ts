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
      const customer = await prisma.customer.create({
        data: {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          isActive: customerData.isActive,
        },
      });
      console.log(`Customer ${customer.name} created`);
      accCustomers++;
    }

    // Create drivers
    for (const driverData of data.drivers) {
      const driver = await prisma.driver.create({
        data: {
          name: driverData.name,
          email: driverData.email,
          phone: driverData.phone,
          car: driverData.car,
          review: driverData.review,
          rate: driverData.rate,
          minimumDistance: driverData.minimumDistance,
          isActive: driverData.isActive,
        },
      });

      console.log(`Driver ${driver.name} created`);
      accDrivers++;
    }

    console.log(
      `${accCustomers} Customers and ${accDrivers} Drivers added in database`,
    );
  }
}

// Execute seed function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
