import { HttpStatus } from '@nestjs/common';
import { readFileSync } from 'fs';
import { CreateDogDto } from 'src/dog/create-dog.dto';
import { UpdateDogDto } from 'src/dog/update-dog.dto';
import { AxiosTestInstance } from '../test-utils';

const axiosTestInstance = new AxiosTestInstance('dogs');

describe('DogController', () => {
  it('can get all dogs', async () => {
    const allDogs = JSON.parse(
      readFileSync('/usr/app/test/json/dog/all-dogs.json', 'utf-8'),
    );
    const response = await axiosTestInstance.getRequest('');
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.data).toEqual(allDogs);
  });

  it('can get a dog by id', async () => {
    const expectedDog = JSON.parse(
      readFileSync('/usr/app/test/json/dog/dog-id-1.json', 'utf-8'),
    );

    const response = await axiosTestInstance.getRequest('1');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.data).toEqual(expectedDog);
  });

  it('can return a 404 status if no dog is found with the matching ID', async () => {
    const response = await axiosTestInstance.getRequest('42');

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
    expect(response.data.message).toContain('No dog with id 42 found');
  });

  it('can add a new Dog', async () => {
    const newDog: CreateDogDto = JSON.parse(
      readFileSync('/usr/app/test/json/dog/new-dog.json', 'utf-8'),
    );

    const postResponse = await axiosTestInstance.postRequest('', newDog);
    expect(postResponse.status).toEqual(HttpStatus.CREATED);

    const addedDog = (await axiosTestInstance.getRequest('6')).data;
    expect(addedDog.name).toEqual(newDog.name);
    expect(addedDog.age).toEqual(newDog.age);
    expect(addedDog.gender).toEqual(newDog.gender);
    expect(addedDog.color).toEqual(newDog.color);
    expect(addedDog.favoriteFood).toEqual(newDog.favoriteFood);
    expect(addedDog.favoriteToy).toEqual(newDog.favoriteToy);
    expect(addedDog.breed.id).toEqual(newDog.breed);
  });

  it('can return a 400 response if the dog to be inserted does not have a name', async () => {
    const postResponse = await axiosTestInstance.postRequest('', {});
    expect(postResponse.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(postResponse.data.message).toContain('Dog name is required');
  });

  it('can return a 400 response if the dog to be inserted has an invalid breed id', async () => {
    const postResponse = await axiosTestInstance.postRequest('', { breed: 42 });
    expect(postResponse.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(postResponse.data.message).toContain('No breed with id 42 found');
  });

  it('can update a dog', async () => {
    const update: UpdateDogDto = {
      name: 'Jeff',
    };
    const putResponse = await axiosTestInstance.putRequest('3', update);
    expect(putResponse.status).toEqual(HttpStatus.OK);

    const updatedDog = (await axiosTestInstance.getRequest('3')).data;
    expect(updatedDog.name).toEqual(update.name);
  });

  it('can return a 400 response when updating a dog if the breed id is invalid', async () => {
    const update: UpdateDogDto = {
      breed: 42,
    };
    const putResponse = await axiosTestInstance.putRequest('3', update);

    expect(putResponse.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('can delete a dog', async () => {
    const deleteResponse = await axiosTestInstance.deleteRequest('1');
    expect(deleteResponse.status).toEqual(HttpStatus.OK);

    const getDeletedDogResponse = await axiosTestInstance.getRequest('1');
    expect(getDeletedDogResponse.status).toEqual(HttpStatus.NOT_FOUND);
  });
});
