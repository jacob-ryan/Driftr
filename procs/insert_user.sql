USE [333-2014-Driftr]
GO

IF OBJECT_ID('insert_user', 'P') IS NOT NULL
DROP PROCEDURE [insert_user]
GO

CREATE PROCEDURE [insert_user]
	@Email_1 varchar(255),
	@Name_2 varchar(255),
	@PasswordHash_3 binary(64),
	@PasswordSalt_4 binary(64)
AS

-- Check if parameters are valid --
IF (@Email_1 IS NULL) OR ((SELECT count(*) FROM [User] WHERE email = @Email_1) > 0)
BEGIN
	PRINT 'Email address is already in use'
	RETURN 1
END

IF ((@Name_2 IS NULL) OR (LEN(@Name_2) <= 0))
BEGIN
	PRINT 'Name must be at least 1 character long'
	RETURN 2
END

IF (@PasswordHash_3 IS NULL)
BEGIN
	PRINT 'No password hash inserted'
	RETURN 3
END

IF (@PasswordSalt_4 IS NULL)
BEGIN
	PRINT 'No password salt inserted'
	RETURN 4
END

-- Insert into User Table --
INSERT INTO [User]
([email], [name], [passwordHash], [passwordSalt])
VALUES (@Email_1, @Name_2, @PasswordHash_3, @PasswordSalt_4)

RETURN 0