USE [333-2014-Driftr]
GO

IF OBJECT_ID('insert_eventparticipant', 'P') IS NOT NULL
DROP PROCEDURE [insert_eventparticipant]
GO

CREATE PROCEDURE [insert_eventparticipant]
	@Email_1 varchar(255),
	@EventID_2 int,
	@Placement_3 int
AS

IF (@Email_1 IS NULL) OR ((SELECT count(*) FROM [User] WHERE email = @Email_1) = 0)
BEGIN
	PRINT 'User' + @Email_1 + 'does not exist'
	RETURN 1
END

IF (@EventID_2 IS NULL) OR ((SELECT count(*) FROM [Event] WHERE id = @EventID_2) = 0)
BEGIN
	PRINT 'Event with id' + @EventID_2 + 'does not exist'
	RETURN 2
END

--Insert into EventParticipant table--
INSERT INTO [EventParticipant]
([userEmail], [eventId], [placement])
VALUES (@Email_1, @EventID_2, @Placement_3)

RETURN 0