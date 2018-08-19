CREATE TABLE user_history (
	id INT NOT NULL AUTO_INCREMENT,
    user_id varchar(100),
    avg_load_time DECIMAL(8,2) unsigned,
    loads mediumint,
    images smallint,
    bytes int,
    bytesSavedByCompression int default 0,
    bytesSavedByCache int default 0,
    filesSavedByCache int default 0,
    PRIMARY KEY (id)
);

CREATE TABLE user_settings (
	id INT NOT NULL auto_increment,
    history_id int not null,
    compression bit default 0,
    cache bit default 0,
    user_id varchar(100),
    FOREIGN KEY (history_id) REFERENCES user_history(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);