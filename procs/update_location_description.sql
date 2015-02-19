USE [333-2014-Driftr]
GO

IF OBJECT_ID('update_location_description', 'P') IS NOT NULL
DROP PROCEDURE [update_location_description]
GO

CREATE PROCEDURE [update_location_description]
(@id_1 int = NULL,
 @description_2 varchar(MAX) = NULL)
AS

IF (@id_1 IS NULL OR (SELECT count(*) FROM [Location] WHERE id = @id_1) < 1)
BEGIN
	PRINT 'Id does not exist'
	RETURN 1
END

IF (@description_2 IS NULL OR LEN(@description_2)<=0)
BEGIN
	PRINT 'Description not valid'
	RETURN 2
END

-- update the table
IF(@description_2 IS NOT NULL)
BEGIN
	UPDATE [Location]
		SET description = @description_2
		WHERE id = @id_1
END

RETURN 0
GO