import { HttpStatus } from '@nestjs/common';
import axios from 'axios';

describe('DogController', () => {
  it('can get all Dogs', async () => {
    const response = await axios.get('http://app:3000/api/dogs');
    expect(response.status).toBe(HttpStatus.OK);
  });
});
