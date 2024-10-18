import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { readFileSync } from 'fs';
import { CreateBreedDto } from 'src/breed/create-breed.dto';
import { UpdateBreedDto } from 'src/breed/update-breed.dto';

describe('BreedController', () => {
  it('can get all breeds', async () => {
    const allBreeds = JSON.parse(
      readFileSync('/usr/app/test/json/all-breeds.json', 'utf-8'),
    );
    const response = await axios.get('http://app:3000/api/breeds');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.data).toEqual(allBreeds);
  });

  it('can get a breed by id', async () => {
    const expectedBreed = JSON.parse(
      readFileSync('/usr/app/test/json/breed-id-1.json', 'utf-8'),
    );
    const response = await axios.get('http://app:3000/api/breeds/1');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.data).toEqual(expectedBreed);
  });

  it('can return a 404 status if no breed is found with the matching id', async () => {
    const response = await axios.get('http://app:3000/api/breeds/42', {
      validateStatus: () => true,
    });

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
    expect(response.data.message).toContain('No breed with id 42 found');
  });

  it('can add a new breed', async () => {
    const newBreed: CreateBreedDto = JSON.parse(
      readFileSync('/usr/app/test/json/new-breed.json', 'utf-8'),
    );

    const postResponse = axios.post('http://app:3000/api/breeds', newBreed);
    expect((await postResponse).status).toEqual(HttpStatus.CREATED);

    const addedBreed = (await axios.get('http://app:3000/api/breeds/6')).data;
    expect(addedBreed.name).toEqual(newBreed.name);
    expect(addedBreed.size).toEqual(newBreed.size);
    expect(addedBreed.friendliness).toEqual(newBreed.friendliness);
    expect(addedBreed.trainability).toEqual(newBreed.trainability);
    expect(addedBreed.sheddingAmount).toEqual(newBreed.sheddingAmount);
    expect(addedBreed.exerciseNeeds).toEqual(newBreed.exerciseNeeds);
  });

  it('can return a 400 response if the breed to be inserted does not have a name', async () => {
    const postResponse = await axios.post(
      'http://app:3000/api/breeds',
      {},
      { validateStatus: () => true },
    );

    expect(postResponse.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(postResponse.data.message).toContain('Breed name is required');
  });

  it('can update a breed', async () => {
    const update: UpdateBreedDto = {
      name: 'Different Name',
    };
    const putResponse = await axios.put('http://app:3000/api/breeds/6', update);
    expect(putResponse.status).toEqual(HttpStatus.OK);

    const updatedBreed = (await axios.get('http://app:3000/api/breeds/6')).data;
    expect(updatedBreed.name).toEqual(update.name);
  });

  it('can return a 409 response if a conflict is encountered when updating a breed', async () => {
    const update: UpdateBreedDto = {
      name: 'German Shepherd', // Duplicate name
    };
    const putResponse = await axios.put(
      'http://app:3000/api/breeds/2',
      update,
      {
        validateStatus: () => true,
      },
    );

    expect(putResponse.status).toEqual(HttpStatus.CONFLICT);
    expect(putResponse.data.message).toContain(
      'Failed to update breed due to a conflict in the database',
    );
  });

  it('can delete a breed', async () => {
    // Make sure the dog added in another test is present
    const initialGetResponse = await axios.get('http://app:3000/api/breeds/6');
    expect(initialGetResponse.status).toEqual(HttpStatus.OK);

    const deleteResponse = await axios.delete('http://app:3000/api/breeds/6');
    expect(deleteResponse.status).toEqual(HttpStatus.OK);

    const getResponseAfterDeleting = await axios.get(
      'http://app:3000/api/breeds/6',
      {
        validateStatus: () => true,
      },
    );
    expect(getResponseAfterDeleting.status).toEqual(HttpStatus.NOT_FOUND);
  });
});
