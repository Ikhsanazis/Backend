CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR, email VARCHAR, password VARCHAR, image VARCHAR);

CREATE TABLE recipes (recipe_id SERIAL PRIMARY KEY, name VARCHAR, ingredients VARCHAR, category VARCHAR, liked INT, image VARCHAR, video VARCHAR, user_id INT REFERENCES users(id));

CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, comment VARCHAR, user_id INT REFERENCES users(id),recipe_id INT REFERENCES recipes(recipe_id));

CREATE TABLE likes (like_id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id),recipe_id INT REFERENCES recipes(recipe_id));

CREATE TABLE saves (save_id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id),recipe_id INT REFERENCES recipes(recipe_id));

