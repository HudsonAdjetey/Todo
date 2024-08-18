CREATE DATABASE todoapp;

CREATE TABLE todos (
    id serial PRIMARY KEY,
    user_email VARCHAR(30) NOT NULL,
    title VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    progress INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date DATE
)

CREATE TABLE users (
    id serial PRIMARY KEY,
    email VARCHAR(30) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    );


