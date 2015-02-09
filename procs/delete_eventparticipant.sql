USE [333-2014-Driftr]
GO

IF OBJECT_ID('delete_eventparticipant', 'P') IS NOT NULL
DROP PROCEDURE [delete_eventparticipant]
GO

CREATE PROCEDURE [delete_eventparticipant]
(
	@Email_1 varchar(255),
	@EventID_2 int
	)
AS

IF ( (@Email_1 IS NULL) OR (@EventID_2 IS NULL) OR ((SELECT count(*) FROM [EventParticipant] WHERE userEmail = @Email_1 AND eventId = @EventID_2) = 0))
BEGIN
	PRINT 'Event Participant ' + @Email_1 + ' for event ' +  @EventID_2 + ' does not exist'
	RETURN 1
END
-- Delete if email and eventId pairing is valid --

DELETE FROM [EventParticipant]
WHERE userEmail = @Email_1 AND eventId = @EventID_2

RETURN 0

