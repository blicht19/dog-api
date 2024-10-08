CREATE TYPE BREED_SIZE AS ENUM ('Tiny', 'Small', 'Medium', 'Large');

CREATE domain RATING AS INTEGER CHECK (VALUE BETWEEN 1 AND 5);

CREATE domain UINT AS SMALLINT CHECK (VALUE >= 0);

CREATE TYPE DOG_GENDER AS ENUM ('Male', 'Female', 'Unknown');

CREATE TABLE
    breed (
        id serial PRIMARY key,
        name CHARACTER VARYING(255) NOT NULL UNIQUE,
        size BREED_SIZE,
        friendliness RATING,
        trainability RATING,
        sheddingamount RATING,
        exerciseneeds RATING
    );

\copy breed (name, size, friendliness, trainability, sheddingamount, exerciseneeds) FROM '/etc/seed-data/breeds.csv' CSV HEADER;

CREATE TABLE
    dog (
        id serial PRIMARY key,
        name CHARACTER VARYING(255) NOT NULL,
        age UINT,
        breed INTEGER REFERENCES breed (id),
        gender DOG_GENDER,
        color CHARACTER VARYING(255),
        favoritefood CHARACTER VARYING(255),
        favoritetoy CHARACTER VARYING(255)
    );

\copy dog (name, age, breed, gender, color, favoritefood, favoritetoy) FROM '/etc/seed-data/dogs.csv' CSV HEADER;