USE [333-2014-Driftr]
GO

IF OBJECT_ID('vehicles_allowed', 'P') IS NOT NULL
DROP PROCEDURE [vehicles_allowed]
GO

CREATE PROCEDURE [vehicles_allowed]
@email_1 varchar(255),
@eventID_2 int
AS

DECLARE @MakeBlacklist VARCHAR(255)
--SET @MakeBlacklist = 'Ford,Lancia'
SELECT @makeBlackList = entries FROM Preferences
WHERE eventId = @eventId_2 AND field = 'make' AND isWhiteList = 0

DECLARE @ModelBlacklist VARCHAR(255)
--SET @ModelBlacklist = 'S2000'
SELECT @modelBlackList = entries FROM Preferences
WHERE eventId = @eventId_2 AND field = 'model' AND isWhiteList = 0

DECLARE @ColorBlacklist VARCHAR(255)
--SET @ColorBlacklist = 'Silver'
SELECT @ColorBlackList = entries FROM Preferences
WHERE eventId = @eventId_2 AND field = 'color' AND isWhiteList = 0

DECLARE @MakeWhitelist VARCHAR(255)
--SET @MakeWhitelist = 'Honda,Ford'
SELECT @makeWhiteList = entries FROM Preferences
WHERE eventId = @eventId_2 AND field = 'make' AND isWhiteList = 1

DECLARE @ModelWhitelist VARCHAR(255)
--SET @ModelWhitelist = 'Fit,Civic'
SELECT @modelWhiteList = entries FROM Preferences
WHERE eventId = @eventId_2 AND field = 'model' AND isWhiteList = 1

DECLARE @ColorWhitelist VARCHAR(255)
--SET @ColorWhitelist = 'Blue,White'
SELECT @ColorWhiteList = entries FROM Preferences
WHERE eventId = @eventId_2 AND field = 'color' AND isWhiteList = 1

DECLARE @Results TABLE 
(
  id int NOT NULL, 
  userEmail varchar(255) NOT NULL,
  active bit NOT NULL,
  make varchar(255) NOT NULL,
  model varchar(255) NOT NULL,
  "year" int NOT NULL,
  color varchar(255) NOT NULL,
  "description" varchar(max) NOT NULL
)

INSERT INTO @Results (id, userEmail, active, make, model, "year", color, "description")
SELECT v.id, userEmail, active, make, model, "year", color, "description" FROM Vehicle v
WHERE v.userEmail = @email_1

--
-- APPLY BLACKLISTS
--

DELETE FROM @Results
FROM @Results r
	INNER JOIN dbo.Split(@MakeBlacklist, ',') AS split
	ON r.make = split.[DATA]

DELETE FROM @Results
FROM @Results r
	INNER JOIN dbo.Split(@ModelBlacklist, ',') AS split
	ON r.model = split.[DATA]

DELETE FROM @Results
FROM @Results r
	INNER JOIN dbo.Split(@ColorBlacklist, ',') AS split
	ON r.color = split.[DATA]


--
-- APPLY WHITELISTS
--

-- Create a temporary copy of the results table, then filter the temp with the whitelist and put back into results table

DECLARE @Temp TABLE 
(
  id int NOT NULL, 
  userEmail varchar(255) NOT NULL,
  active bit NOT NULL,
  make varchar(255) NOT NULL,
  model varchar(255) NOT NULL,
  "year" int NOT NULL,
  color varchar(255) NOT NULL,
  "description" varchar(max) NOT NULL
)

-- Make Whitelist

INSERT INTO @Temp (id, userEmail, active, make, model, "year", color, "description")
SELECT * FROM @Results

DELETE FROM @Results

INSERT INTO @Results (id, userEmail, active, make, model, "year", color, "description")
SELECT r.id, userEmail, active, make, model, "year", color, "description"
FROM @Temp r
	INNER JOIN dbo.Split(@MakeWhitelist, ',') AS split
	ON r.make = split.[DATA]

-- Model Whitelist
DELETE FROM @Temp
INSERT INTO @Temp (id, userEmail, active, make, model, "year", color, "description")
SELECT * FROM @Results

DELETE FROM @Results

INSERT INTO @Results (id, userEmail, active, make, model, "year", color, "description")
SELECT r.id, userEmail, active, make, model, "year", color, "description"
FROM @Temp r
	INNER JOIN dbo.Split(@ModelWhitelist, ',') AS split
	ON r.model = split.[DATA]

-- Color Whitelist
DELETE FROM @Temp
INSERT INTO @Temp (id, userEmail, active, make, model, "year", color, "description")
SELECT * FROM @Results

DELETE FROM @Results

INSERT INTO @Results (id, userEmail, active, make, model, "year", color, "description")
SELECT r.id, userEmail, active, make, model, "year", color, "description"
FROM @Temp r
	INNER JOIN dbo.Split(@ColorWhitelist, ',') AS split
	ON r.color = split.[DATA]

SELECT count(id) as count FROM @Results