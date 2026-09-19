CREATE TYPE game_status_type AS ENUM ('in_progress', 'completed', 'aborted');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    username VARCHAR(64) NOT NULL UNIQUE,
    hashpass TEXT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE game_sessions (
    game_id SERIAL PRIMARY KEY,
    game_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    user_id INT REFERENCES users(user_id),
    game_type VARCHAR(64) NOT NULL,
    game_start_time TIMESTAMPTZ NOT NULL ,
    game_end_time TIMESTAMPTZ,
    result INT,
    status game_status_type NOT NULL DEFAULT 'in_progress'
);

CREATE TABLE session_answers (
    session_answer_id SERIAL PRIMARY KEY,
    game_id INT REFERENCES game_sessions(game_id) ON DELETE CASCADE,
    question_order INT NOT NULL,
    question TEXT NOT NULL,
    answer INT,
    answer_correct BOOLEAN,
    time_spent_ms INT NOT NULL

);
