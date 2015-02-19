USE [333-2014-Driftr]
GO

IF OBJECT_ID('delete_preference', 'P') IS NOT NULL
DROP PROCEDURE [delete_preference]
GO

CREATE PROCEDURE [delete_preference]
(@eventId_1 int,
 @field_2 varchar(255))
AS

-- Delete if id is valid --

IF (@eventId_1 IS NULL) OR ((SELECT count(*) FROM [Preferences] WHERE eventId = @eventId_1) <= 0)
BEGIN
	PRINT 'No preferences exist for eventId ' + @eventId_1 + '.'
	RETURN 1
END

IF (@field_2 IS NULL) OR ((SELECT count(*) FROM [Preferences] WHERE eventId = @eventId_1 AND field = @field_2) <= 0)
BEGIN
	PRINT 'Preference for that eventId '+@eventId_1+' and field '+@field_2+' does not exist.'
	RETURN 2
END

RETURN 0
GO