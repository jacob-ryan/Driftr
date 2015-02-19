USE [333-2014-Driftr]
GO

IF OBJECT_ID('insert_preference', 'P') IS NOT NULL
DROP PROCEDURE [insert_preference]
GO

CREATE PROCEDURE [insert_preference]
(@userEmail_1 varchar(255),
 @type_3 varchar(255),
 @key_4 varchar(255),
 @value_5 varchar(255),
 @rating_2 int)
AS

-- Check if parameters are valid --

IF (@userEmail_1 IS NULL) OR ((SELECT count(*) FROM [User] WHERE email = @UserEmail_1) <= 0)
BEGIN
	PRINT 'Email ' + @UserEmail_1 + ' does not exist'
	RETURN 1
END

IF (@rating_2 IS NULL)
BEGIN
	PRINT 'Rating not valid'
	RETURN 2
END

IF (@type_3 IS NULL)
BEGIN
	PRINT 'Type not valid'
	RETURN 3
END

IF (@key_4 IS NULL)
BEGIN
	PRINT 'Key not valid'
	RETURN 4
END

IF (@value_5 IS NULL)
BEGIN
	PRINT 'Value not valid'
	RETURN 5
END

-- Insert into Preferences Table --

INSERT INTO [Preferences]
([userEmail], [rating], [type], [key], [value])
VALUES (@userEmail_1, @rating_2, @type_3, @key_4, @value_5)

RETURN 0
GO