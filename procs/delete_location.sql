USE [333-2014-Driftr]
GO

IF OBJECT_ID('delete_location', 'P') IS NOT NULL
DROP PROCEDURE [delete_location]
GO

CREATE PROCEDURE [delete_location]
	@id_1 int
AS

-- Check if parameters are valid --
IF (@id_1 IS NULL) OR ((SELECT count(*) FROM [Location] WHERE id = @id_1) <= 0)
BEGIN
	PRINT 'ID ' + @id_1 + ' does not exist'
	RETURN 1
END

IF((SELECT count(*) FROM [Event] WHERE locationId = @id_1) > 0)
BEGIN
	PRINT 'Location used in event'
	Return 2
END

-- Delete Location --
DELETE FROM [Location]
WHERE id = @id_1

RETURN 0