USE [333-2014-Driftr]
GO

IF OBJECT_ID('vehicles_allowed', 'P') IS NOT NULL
DROP PROCEDURE [vehicles_allowed]
GO

CREATE PROCEDURE [vehicles_allowed]
@email_1 varchar(255),
@eventID_2 int
AS

--name return column count
DECLARE @MakeBlacklist VARCHAR(255)
SET @MakeBlacklist = '';
DECLARE @ModelBlacklist VARCHAR(255)
SET @ModelBlacklist = '';
DECLARE @ColorBlacklist VARCHAR(255)
SET @ColorBlacklist = '';

DECLARE @Makes VARCHAR(255)
SET @Makes = 'Honda,Ford,Toyota'

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

--insert everything that isn't blacklisted from vehicles
INSERT INTO @Results (id, userEmail, active, make, model, "year", color, "description")
	SELECT v.id, userEmail, active, make, model, "year", color, "description" FROM Vehicle v
		INNER JOIN dbo.Split(@MakeBlacklist, ',') AS splitMakes
		ON v.make != splitMakes.[DATA]
		INNER JOIN dbo.Split(@ModelBlacklist, ',') AS splitModels
		ON v.model != splitModels.[DATA]
		INNER JOIN dbo.Split(@ColorBlacklist, ',') AS splitColors
		ON v.color != splitColors.[DATA]
	WHERE v.userEmail = @email_1

IF(1=1)
BEGIN
INSERT INTO @Results (id, userEmail, active, make, model, "year", color, "description")
	SELECT v.id, userEmail, active, make, model, "year", color, "description" FROM Vehicle v
	INNER JOIN dbo.Split(@Makes, ',') AS split
	ON v.make = split.[DATA]
	WHERE v.userEmail = @email_1
END

IF(1=1)
BEGIN
SELECT * FROM Vehicle v
INNER JOIN dbo.Split(@Makes, ',') AS split
ON v.make = split.[DATA]
WHERE v.userEmail = @email_1
END

IF(1=1)
BEGIN
SELECT * FROM Vehicle v
INNER JOIN dbo.Split(@Makes, ',') AS split
ON v.make = split.[DATA]
WHERE v.userEmail = @email_1
END
