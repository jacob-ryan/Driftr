USE [333-2014-Driftr]
GO

IF OBJECT_ID('insert_location', 'P') IS NOT NULL
DROP PROCEDURE [insert_location]
GO

CREATE PROCEDURE [insert_location]
	@address_1 varchar(255) = NULL,
	@city_2 varchar(255) = NULL,
	@state_3 char(2) = NULL,
	@description_4 varchar(max) = NULL
AS

-- Check if parameters are valid --
IF (@address_1 IS NULL OR LEN(@address_1)<=0 OR LEN(@address_1)>255)
BEGIN
	PRINT 'Address is not valid'
	RETURN 1
END

IF (@city_2 IS NULL OR LEN(@city_2)<=0 OR LEN(@city_2)>255)
BEGIN
	PRINT 'City is not valid'
	RETURN 1
END

IF (@state_3 IS NULL OR LEN(@state_3)<=0 OR LEN(@state_3)>2)
BEGIN
	PRINT 'State not valid'
	RETURN 3
END

IF (@description_4 IS NULL OR LEN(@description_4)<=0 OR LEN(@description_4)>255)
BEGIN
	PRINT 'State not valid'
	RETURN 3
END

-- Insert into Location Table --
INSERT INTO [Location]
([address], [city], [state], [description])
VALUES (@address_1, @city_2, @state_3, @description_4)

RETURN 0