USE [333-2014-Driftr]
GO

IF OBJECT_ID('insert_event', 'P') IS NOT NULL
DROP PROCEDURE [insert_event]
GO

CREATE PROCEDURE [insert_event]
(@userEmail_1 varchar(255),
 @locationID_2 int,
 @eventDate_3 datetime,
 @theme_4 varchar(255),
 @description_5 varchar(MAX),
 @wasBusted_6 bit = NULL)
AS

-- Check if parameters are valid --

IF (@userEmail_1 IS NULL) OR ((SELECT count(*) FROM [User] WHERE email = @UserEmail_1) <= 0)
BEGIN
	PRINT 'Email ' + @UserEmail_1 + ' does not exist'
	RETURN 1
END

IF (@locationID_2 IS NULL) OR ((SELECT count(*) FROM [Location] WHERE id = @locationID_2) <=0)
BEGIN
	PRINT 'Data not valid'
	RETURN 2
END

IF (@eventDate_3 IS NULL)
BEGIN
	PRINT 'Theme not valid'
	RETURN 2
END

IF (@theme_4 IS NULL OR LEN(@theme_4)<=0 OR LEN(@theme_4)>255)
BEGIN
	PRINT 'Theme not valid'
	RETURN 2
END

IF (@description_5 IS NULL)
BEGIN
	PRINT 'Description not valid'
	RETURN 2
END

-- Insert into User Table --

INSERT INTO [Event]
([userEmail], [locationID], [eventDate], [theme], [description], [wasBusted])
VALUES (@userEmail_1, @locationID_2, @eventDate_3, @theme_4, @description_5, @wasBusted_6)

RETURN 0

GO