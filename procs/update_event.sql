USE [333-2014-Driftr]
GO

CREATE PROCEDURE [update_event]
(@id_1 int,
 @locationId_2 int,
 @eventDate_3 datetime,
 @theme_4 varchar(255),
 @description_5 varchar(MAX),
 @wasBusted_6 bit = NULL)
AS

-- Check if parameters are valid --

IF (@id_1 IS NULL) OR ((SELECT count(*) FROM [Event] WHERE id = @id_1) <= 0)
BEGIN
	PRINT 'Event id not valid'
	RETURN 1
END

-- Update if parameters aren't null --

IF (@locationId_2 IS NOT NULL)
BEGIN
	UPDATE [Event]
		SET locationId = @locationId_2
		WHERE id = @id_1
END

IF (@eventDate_3 IS NOT NULL)
BEGIN
	UPDATE [Event]
		SET eventDate = eventDate_3
		WHERE id = @id_1
END

IF (@theme_4 IS NOT NULL)
BEGIN
	UPDATE [Event]
		SET theme = @theme_4
		WHERE id = @id_1
END

IF (@description_5 IS NOT NULL)
BEGIN
	UPDATE [Event]
		SET [description] = @description_5
		WHERE id = @id_1
END

IF (@wasBusted_6 IS NOT NULL)
BEGIN
	UPDATE [Event]
		SET wasBusted = @wasBusted_6
		WHERE id = @id_1
END

RETURN 0

GO