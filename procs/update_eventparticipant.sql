USE [333-2014-Driftr]
GO

IF OBJECT_ID('update_eventparticipant', 'P') IS NOT NULL
DROP PROCEDURE [update_eventparticipant]
GO

CREATE PROCEDURE [update_eventparticipant]
(
	@Email_1 varchar(255),
	@EventID_2 int,
	@Placement_3 int
 )
AS

IF (@Email_1 IS NULL) OR ((SELECT count(*) FROM [EventParticipant] WHERE userEmail = @Email_1) = 0)
BEGIN
	PRINT 'User' + @Email_1 + 'does not exist'
	RETURN 1
END

IF (@EventID_2 IS NULL) OR ((SELECT count(*) FROM [EventParticipant] WHERE eventId = @EventID_2) = 0)
BEGIN
	PRINT 'Event with id' + @EventID_2 + 'does not exist'
	RETURN 2
END

IF (@Placement_3 IS NOT NULL)
BEGIN
	UPDATE [EventParticipant]
		SET Placement = @Placement_3
		WHERE userEmail = @Email_1 AND eventId = @EventID_2
END

RETURN 0 
GO