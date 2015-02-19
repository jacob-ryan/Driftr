USE [333-2014-Driftr]
GO

CREATE TABLE [User]
(
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	passwordHash binary(64) NOT NULL,
	passwordSalt binary(64) NOT NULL,

	PRIMARY KEY (email)
);

CREATE TABLE [Vehicle]
(
	id int IDENTITY(1,1),
	userEmail varchar(255) NOT NULL,
	active bit NOT NULL,
	make varchar(255) NOT NULL,
	model varchar(255) NOT NULL,
	year int NOT NULL,
	color varchar(255) NOT NULL,
	description varchar(max) NOT NULL,

	PRIMARY KEY(id),
	FOREIGN KEY(userEmail) REFERENCES [User](email)
);

CREATE TABLE [Friend]
(
	userEmailA varchar(255) NOT NULL,
	userEmailB varchar(255) NOT NULL,
	relation varchar(255) NOT NULL,

	PRIMARY KEY(userEmailA, userEmailB),
	FOREIGN KEY(userEmailA) REFERENCES [User](email),
	FOREIGN KEY(userEmailB) REFERENCES [User](email)
);

CREATE TABLE [Location]
(
	id int IDENTITY(1,1),
	address varchar(255) NOT NULL,
	description varchar(max) NOT NULL,
	latitude varchar(255) NOT NULL,
	longitude varchar(255) NOT NULL

	PRIMARY KEY(id)
);


CREATE TABLE [Event]
(
	id int IDENTITY(1,1),
	userEmail varchar(255) NOT NULL,
	locationId int NOT NULL,
	eventDate datetime NOT NULL,
	theme varchar(255) NOT NULL,
	description varchar(max) NOT NULL,
	wasBusted bit NOT NULL,

	PRIMARY KEY(id),
	FOREIGN KEY(userEmail) REFERENCES [User](email),
	FOREIGN KEY(locationId) REFERENCES [Location](id)
);

CREATE TABLE [EventParticipant]
(
	userEmail varchar(255) NOT NULL,
	eventId int,
	placement int,

	PRIMARY KEY(userEmail, eventId),
	FOREIGN KEY(userEmail) REFERENCES [User](email),
	FOREIGN KEY(eventId) REFERENCES [Event](id)
);

CREATE TABLE [Preferences]
(
	eventId int NOT NULL,
	field varchar(255) NOT NULL,
	entries varchar(max) NOT NULL,
	isWhitelist bit NOT NULL,
	
	PRIMARY KEY(eventId, field),
	FOREIGN KEY(eventId) REFERENCES [Event](id)
);