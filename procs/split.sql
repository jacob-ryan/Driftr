USE [333-2014-Driftr]
GO

/*CREATE FUNCTION [dbo].[Split]
(
    @String NVARCHAR(4000),
    @Delimiter NCHAR(1)
)
RETURNS TABLE
AS
RETURN
(
    WITH Split(stpos,endpos)
    AS(
        SELECT 0 AS stpos, CHARINDEX(@Delimiter,@String) AS endpos
        UNION ALL
        SELECT endpos+1, CHARINDEX(@Delimiter,@String,endpos+1)
            FROM Split
            WHERE endpos > 0
    )
    SELECT 'Id' = ROW_NUMBER() OVER (ORDER BY (SELECT 1)),
        'Data' = SUBSTRING(@String,stpos,COALESCE(NULLIF(endpos,0),LEN(@String)+1)-stpos)
    FROM Split
)
GO*/

/*DECLARE @DelimitedString NVARCHAR(128)
SET @DelimitedString = 'Honda,Ford,Toyota'
SELECT * FROM dbo.Split(@DelimitedString, ',')*/




DECLARE @email VARCHAR(255)
SET @email = 'joe@cool.com'

DECLARE @MakeBlacklist VARCHAR(255)
SET @MakeBlacklist = 'Ford,Lancia'

DECLARE @ModelBlacklist VARCHAR(255)
SET @ModelBlacklist = 'S2000'

DECLARE @ColorBlacklist VARCHAR(255)
SET @ColorBlacklist = 'Silver'

DECLARE @MakeWhitelist VARCHAR(255)
SET @MakeWhitelist = 'Honda,Ford'

DECLARE @ModelWhitelist VARCHAR(255)
SET @ModelWhitelist = 'Fit'

DECLARE @ColorWhitelist VARCHAR(255)
SET @ColorWhitelist = 'Blue'

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
WHERE v.userEmail = @email

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

SELECT * FROM @Results