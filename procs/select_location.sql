USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_location', 'P') IS NOT NULL
DROP PROCEDURE [select_location]
GO

CREATE PROCEDURE [select_location]
@id_1 int
AS

IF (((SELECT count(*) FROM [Location] WHERE id = @id_1)) = 0 OR @id_1 IS NULL)
BEGIN
	PRINT 'ID does not exist'
	RETURN 1
END

SELECT * FROM [Location]
WHERE id = @id_1

RETURN 0
GO