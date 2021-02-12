DROP TABLE IF EXISTS schedule;

CREATE TABLE IF NOT EXISTS schedule (
    schedule_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    day SMALLINT NOT NULL CHECK (day >= 1 AND day <= 7),
    start_time TIME,
    end_time TIME
);