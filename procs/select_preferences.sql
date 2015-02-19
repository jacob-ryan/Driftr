USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_preferences', 'P') IS NOT NULL
DROP PROCEDURE [select_preferences]
GO

CREATE PROCEDURE [select_preferences]
@eventId_1 int
AS

IF (((SELECT count(*) FROM [Preferences] WHERE eventId = @eventId_1)) = 0 OR @eventId_1 IS NULL)
BEGIN
	PRINT 'No preferences exits for eventId '+@eventId_1+'.'
	RETURN 1
END

SELECT * FROM [Preferences]
WHERE eventId = @eventId_1

RETURN 0
GO