import { HttpStatus } from '@nestjs/common';
import { readFileSync } from 'fs';
import { CreateBreedDto } from 'src/breed/create-breed.dto';
import { UpdateBreedDto } from 'src/breed/update-breed.dto';
import { AxiosTestInstance } from '../test-utils';

const axiosTestInstance = new AxiosTestInstance('breeds');

describe('BreedController', () => {
  it('can get all breeds', async () => {
    const allBreeds = JSON.parse(
      readFileSync('/usr/app/test/json/breed/all-breeds.json', 'utf-8'),
    );
    const response = await axiosTestInstance.getRequest('');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.data).toEqual(allBreeds);
  });

  it('can get a breed by id', async () => {
    const expectedBreed = JSON.parse(
      readFileSync('/usr/app/test/json/breed/breed-id-1.json', 'utf-8'),
    );
    const response = await axiosTestInstance.getRequest('1');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.data).toEqual(expectedBreed);
  });

  it('can return a 404 status if no breed is found with the matching id', async () => {
    const response = await axiosTestInstance.getRequest('42');

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
    expect(response.data.message).toContain('No breed with id 42 found');
  });

  it('can add a new breed', async () => {
    const newBreed: CreateBreedDto = JSON.parse(
      readFileSync('/usr/app/test/json/breed/new-breed.json', 'utf-8'),
    );

    const postResponse = axiosTestInstance.postRequest('', newBreed);
    expect((await postResponse).status).toEqual(HttpStatus.CREATED);

    const addedBreed = (await axiosTestInstance.getRequest('6')).data;
    expect(addedBreed.name).toEqual(newBreed.name);
    expect(addedBreed.size).toEqual(newBreed.size);
    expect(addedBreed.friendliness).toEqual(newBreed.friendliness);
    expect(addedBreed.trainability).toEqual(newBreed.trainability);
    expect(addedBreed.sheddingAmount).toEqual(newBreed.sheddingAmount);
    expect(addedBreed.exerciseNeeds).toEqual(newBreed.exerciseNeeds);
  });

  it('can return a 400 response if the breed to be inserted does not have a name', async () => {
    const postResponse = await axiosTestInstance.postRequest('', {});

    expect(postResponse.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(postResponse.data.message).toContain('Breed name is required');
  });

  it('can update a breed', async () => {
    const update: UpdateBreedDto = {
      name: 'Different Name',
    };
    const putResponse = await axiosTestInstance.putRequest('6', update);
    expect(putResponse.status).toEqual(HttpStatus.OK);

    const updatedBreed = (await axiosTestInstance.getRequest('6')).data;
    expect(updatedBreed.name).toEqual(update.name);
  });

  it('can return a 409 response if a conflict is encountered when updating a breed', async () => {
    const update: UpdateBreedDto = {
      name: 'German Shepherd', // Duplicate name
    };
    const putResponse = await axiosTestInstance.putRequest('2', update);

    expect(putResponse.status).toEqual(HttpStatus.CONFLICT);
    expect(putResponse.data.message).toContain(
      'Failed to update breed due to a conflict in the database',
    );
  });

  it('can delete a breed', async () => {
    // Make sure the dog added in another test is present
    const initialGetResponse = await axiosTestInstance.getRequest('6');
    expect(initialGetResponse.status).toEqual(HttpStatus.OK);

    const deleteResponse = await axiosTestInstance.deleteRequest('6');
    expect(deleteResponse.status).toEqual(HttpStatus.OK);

    const getResponseAfterDeleting = await axiosTestInstance.getRequest('6');
    expect(getResponseAfterDeleting.status).toEqual(HttpStatus.NOT_FOUND);
  });
});
