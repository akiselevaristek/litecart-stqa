import { faker } from '@faker-js/faker';
import type { CustomerDetails } from '@pages/checkout/CheckoutCustomerDetailsSection';

export class CustomerDetailsGenerator {
  generate(): CustomerDetails {
    return {
      taxId: `DEddddddddd`,
      company: faker.company.name(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      postcode: faker.string.numeric(5),
      city: faker.location.city(),
      countryCode: 'DE',
      email: faker.internet.email(),
      phone: `+8888${faker.string.numeric(8)}`,
    };
  }
}
