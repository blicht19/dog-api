import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { readFileSync } from 'fs';
import { CreateDogDto } from 'src/dog/create-dog.dto';
import { UpdateDogDto } from 'src/dog/update-dog.dto';

describe('DogController', () => {
  let allDogs;

  beforeAll(() => {
    allDogs = JSON.parse(
      readFileSync('/usr/app/test/json/all-dogs.json', 'utf-8'),
    );
  });

  it('can get all dogs', async () => {
    const response = await axios.get('http://app:3000/api/dogs');
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.data).toEqual(allDogs);
  });

  it('can get a dog by id', async () => {
    const expectedDog = JSON.parse(
      readFileSync('/usr/app/test/json/dog-id-1.json', 'utf-8'),
    );

    const response = await axios.get('http://app:3000/api/dogs/1');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.data).toEqual(expectedDog);
  });

  it('can return a 404 status if no dog is found with the matching ID', async () => {
    const response = await axios.get('http://app:3000/api/dogs/42', {
      validateStatus: () => true,
    });

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
    expect(response.data.message).toContain('No dog with id 42 found');
  });

  it('can add a new Dog', async () => {
    const newDog: CreateDogDto = JSON.parse(
      readFileSync('/usr/app/test/json/new-dog.json', 'utf-8'),
    );

    const postResponse = await axios.post('http://app:3000/api/dogs', newDog);
    expect(postResponse.status).toEqual(HttpStatus.CREATED);

    const addedDog = (await axios.get('http://app:3000/api/dogs/6')).data;
    expect(addedDog.name).toEqual(newDog.name);
    expect(addedDog.age).toEqual(newDog.age);
    expect(addedDog.gender).toEqual(newDog.gender);
    expect(addedDog.color).toEqual(newDog.color);
    expect(addedDog.favoriteFood).toEqual(newDog.favoriteFood);
    expect(addedDog.favoriteToy).toEqual(newDog.favoriteToy);
    expect(addedDog.breed.id).toEqual(newDog.breed);
  });

  it('can return a 400 response if the dog to be inserted does not have a name', async () => {
    const postResponse = await axios.post(
      'http://app:3000/api/dogs',
      {},
      { validateStatus: () => true },
    );
    expect(postResponse.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(postResponse.data.message).toContain('Dog name is required');
  });

  it('can return a 400 response if the dog to be inserted has an invalid breed id', async () => {
    const postResponse = await axios.post(
      'http://app:3000/api/dogs',
      { breed: 42 },
      { validateStatus: () => true },
    );
    expect(postResponse.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(postResponse.data.message).toContain('No breed with id 42 found');
  });

  it('can update a dog', async () => {
    const update: UpdateDogDto = {
      name: 'Jeff',
    };
    const putResponse = await axios.put('http://app:3000/api/dogs/3', update);
    expect(putResponse.status).toEqual(HttpStatus.OK);

    const upDatedDog = (await axios.get('http://app:3000/api/dogs/3')).data;
    expect(upDatedDog.name).toEqual(update.name);
  });

  it('can return a 400 response when updating a dog if the breed id is invalid', async () => {
    const update: UpdateDogDto = {
      breed: 42,
    };
    const putResponse = await axios.put('http://app:3000/api/dogs/3', update, {
      validateStatus: () => true,
    });

    expect(putResponse.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('can delete a dog', async () => {
    const deleteResponse = await axios.delete('http://app:3000/api/dogs/1', {
      validateStatus: () => true,
    });
    expect(deleteResponse.status).toEqual(HttpStatus.OK);

    const getDeletedDogResponse = await axios.get(
      'http://app:3000/api/dogs/1',
      {
        validateStatus: () => true,
      },
    );
    expect(getDeletedDogResponse.status).toEqual(HttpStatus.NOT_FOUND);
  });
});
