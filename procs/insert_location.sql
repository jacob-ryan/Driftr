USE [333-2014-Driftr]
GO

IF OBJECT_ID('insert_location', 'P') IS NOT NULL
DROP PROCEDURE [insert_location]
GO

CREATE PROCEDURE [insert_location]
	@address_1 varchar(255) = NULL,
	@description_2 varchar(MAX) = NULL,
	@latitude_3 varchar(255) = NULL,
	@longitude_4 varchar(255) = NULL
AS

-- Check if parameters are valid --

IF (@address_1 IS NULL OR LEN(@address_1)<=0 OR LEN(@address_1)>255)
BEGIN
	PRINT 'Address is not valid'
	RETURN 1
END

IF (@description_2 IS NULL OR LEN(@description_2)<=0)
BEGIN
	PRINT 'Description not valid'
	RETURN 2
END

IF (@latitude_3 IS NULL OR LEN(@latitude_3)<=0 OR LEN(@latitude_3)>255)
BEGIN
	PRINT 'latitude is not valid'
	RETURN 3
END

IF (@longitude_4 IS NULL OR LEN(@longitude_4)<=0 OR LEN(@longitude_4)>255)
BEGIN
	PRINT 'longitude is not valid'
	RETURN 4
END

-- Insert into Location Table --
INSERT INTO [Location]
([address], [description], [latitude], [longitude])
VALUES (@address_1, @description_2, @latitude_3, @longitude_4)

RETURN 0