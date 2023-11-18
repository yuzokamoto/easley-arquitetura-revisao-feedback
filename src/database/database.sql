-- Active: 1700260321957@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
VALUES
('u001', 'Fulano', 'fulano@email.com', 'fulano123', '2023-11-16T22:29:21.941Z'),
('u002', 'Ciclana', 'ciclana@email.com', 'ciclana00', '2023-11-15T22:29:21.941Z');

CREATE TABLE videos (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  creator_id TEXT NOT NULL,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO videos
VALUES
(
  'v001',
  'u001',
  'Como desfazer um commit no git',
  'https://minha-api-example.com/videos/v001.mp4',
  0,
  0,
  '2023-11-16T08:00:0.000Z',
  '2023-11-16T08:00:0.000Z'
),
(
  'v002',
  'u001',
  'Aula de CSS parte 1',
  'https://minha-api-example.com/videos/v002.mp4',
  0,
  0,
  '2023-11-16T12:00:0.000Z',
  '2023-11-16T12:07:0.000Z'
);

CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL,
  video_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO likes_dislikes
VALUES
(
  'u002',
  'v001',
  1
),
(
  'u002',
  'v002',
  0
);

INSERT INTO likes_dislikes
VALUES
(
  'u001',
  'v001',
  1
),
(
  'u001',
  'v002',
  1
);

UPDATE videos
SET likes = 1
WHERE id = 'v001';

UPDATE videos
SET dislikes = 1
WHERE id = 'v002';

DROP TABLE users;