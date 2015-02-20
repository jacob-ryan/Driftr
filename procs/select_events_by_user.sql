USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_events_by_user', 'P') IS NOT NULL
DROP PROCEDURE [select_events_by_user]
GO

CREATE PROCEDURE [select_events_by_user]
@email_1 varchar(255)
AS

IF (((SELECT count(*) FROM [EventParticipant] WHERE userEmail = @email_1)) = 0 OR @email_1 IS NULL)
BEGIN
	PRINT 'Participant not valid'
	RETURN 1
END

SELECT DISTINCT e.id, e.userEmail, e.locationId, e.eventDate, e.theme, e.description, e.wasBusted, l.address 
FROM [Event] e, [Location] l, [EventParticipant] p
WHERE e.locationId = l.id AND e.userEmail = p.userEmail AND p.userEmail = @email_1

RETURN 0
GO