USE [333-2014-Driftr]
GO

IF OBJECT_ID('delete_preference', 'P') IS NOT NULL
DROP PROCEDURE [delete_preference]
GO

CREATE PROCEDURE [delete_preference]
(@id_1 int)
AS

-- Delete if id is valid --

IF (@id_1 IS NULL) OR ((SELECT count(*) FROM [Preferences] WHERE id = @id_1) <= 0)
BEGIN
	PRINT 'ID ' + @id_1 + ' does not exist'
	RETURN 1
END

RETURN 0
GO