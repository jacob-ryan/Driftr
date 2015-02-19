USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_event', 'P') IS NOT NULL
DROP PROCEDURE [select_event]
GO

CREATE PROCEDURE [select_event]
@id_1 int
AS

IF (((SELECT count(*) FROM [Event] WHERE id = @id_1)) = 0 OR @id_1 IS NULL)
BEGIN
	PRINT 'ID does not exist'
	RETURN 1
END

SELECT e.id, e.userEmail, e.locationId, e.eventDate, e.theme, e.description, e.wasBusted, l.address FROM [Event] e, [Location] l
WHERE e.locationId = l.id AND e.id = @id_1

RETURN 0
GO