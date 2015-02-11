USE [333-2014-Driftr]
GO

IF OBJECT_ID('update_user', 'P') IS NOT NULL
DROP PROCEDURE [update_user]
GO

CREATE PROCEDURE [update_user]
(@Email_1 varchar(255) = NULL,
 @Name_2 varchar(255) = NULL,
 @PasswordHash_3 binary(64) = NULL,
 @PasswordSalt_4 binary(64) = NULL)
AS

IF (@Email_1 IS NULL OR (SELECT count(*) FROM [User] WHERE email = @Email_1) = 0)
BEGIN
	PRINT 'Email does not exist'
	RETURN 1
END

IF ((LEN(@Name_2) = 0))
BEGIN
	PRINT 'Name must be at least 1 character long'
	RETURN 2
END

-- update the table
IF(@Name_2 IS NOT NULL)
BEGIN
	UPDATE [User]
		SET name = @Name_2
		WHERE email = @email_1
END

IF(@PasswordHash_3 IS NOT NULL AND @PasswordSalt_4 IS NOT NULL)
BEGIN
	UPDATE [User]
		SET passwordHash = @PasswordHash_3, passwordSalt = @PasswordSalt_4
		WHERE email = @email_1
END

RETURN 0
GO