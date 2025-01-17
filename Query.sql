USE survey_app;

DROP TABLE IF EXISTS question_survey;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS question_options;
DROP TABLE IF EXISTS surveys;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS respondents;
DROP TABLE IF EXISTS credit_funds;

CREATE TABLE credit_funds (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	identity_code VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE respondents (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	credit_fund_id INT NOT NULL,
	FOREIGN KEY (credit_fund_id) REFERENCES credit_funds(id)
);

CREATE TABLE surveys (
	id INT AUTO_INCREMENT PRIMARY KEY,
	credit_fund_id INT NOT NULL,
	FOREIGN KEY (credit_fund_id) REFERENCES credit_funds(id)
);

CREATE TABLE questions (
	id INT AUTO_INCREMENT PRIMARY KEY,
	question_text TEXT NOT NULL,
	question_note TEXT NOT NULL,
	question_type ENUM('opt', 'multi', 'opinion') NOT NULL
);

CREATE TABLE question_options (
   id INT AUTO_INCREMENT PRIMARY KEY,
   question_id INT NOT NULL,
   option_text VARCHAR(255) NOT NULL,
   option_order INT,
   FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE question_survey (
	id INT AUTO_INCREMENT PRIMARY KEY,
	survey_id INT NOT NULL,
	question_id INT NOT NULL,
	FOREIGN KEY (survey_id) REFERENCES surveys(id),
	FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE answers (
   id INT AUTO_INCREMENT PRIMARY KEY,
   question_id INT NOT NULL,
   respondent_id INT NOT NULL,
   answer_text TEXT,
   answer_option VARCHAR(255),
   answer_multiple_options JSON,
   FOREIGN KEY (question_id) REFERENCES questions(id),
   FOREIGN KEY (respondent_id) REFERENCES respondents(id)
);


DELIMITER $$

CREATE TRIGGER update_option_order
BEFORE INSERT ON question_options
FOR EACH ROW
BEGIN
    DECLARE max_order INT;

    -- Lấy giá trị option_order lớn nhất cho question_id hiện tại
    SELECT COALESCE(MAX(option_order), 0) INTO max_order
    FROM question_options
    WHERE question_id = NEW.question_id;

    -- Tăng giá trị option_order lên 1 cho bản ghi mới
    SET NEW.option_order = max_order + 1;
END$$

DELIMITER ;

/*
INSERT INTO questions(question_text, question_note, question_type) VALUE ('Abc', 'no note', 'opt');
INSERT INTO question_options(question_id, option_text) VALUE (1, 'yes');
*/