USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_eventparticipants', 'P') IS NOT NULL
DROP PROCEDURE [select_eventparticipants]
GO

CREATE PROCEDURE [select_eventparticipants]
@id_1 int
AS

IF (((SELECT count(*) FROM [EventParticipant] WHERE eventid = @id_1)) = 0 OR @id_1 IS NULL)
BEGIN
	PRINT 'ID does not exist'
	RETURN 1
END

SELECT * FROM [EventParticipant]
WHERE eventid = @id_1

RETURN 0
GO