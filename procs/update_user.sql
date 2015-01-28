USE [333-2014-Driftr]
GO

CREATE PROCEDURE [update_user]
(@OldEmail_1 [varchar]=NULL,
 @NewEmail_2 [varchar]=NULL,
 @Name_3 [varchar]=NULL,
 @PasswordHash_4 [binary]=NULL,
 @PasswordSalt_5 [binary]=NULL)
AS

IF (((SELECT count(*) FROM [User] WHERE email = @OldEmail_1)) = 0 OR @OldEmail_1 IS NULL)
BEGIN
	PRINT 'Email does not exist'
	RETURN 1
END

IF (((SELECT count(*) FROM [User] WHERE email = @NewEmail_2)) > 0)
BEGIN
	PRINT 'Email ' + @NewEmail_2 + ' already in use'
	RETURN 2
END

IF ((LEN(@Name_3) <= 0))
BEGIN
	PRINT 'Name must be at least 1 character long'
	RETURN 3
END

-- update the table
IF(@Name_3 IS NOT NULL)
BEGIN
	UPDATE [User]
		SET name = @Name_3
		WHERE email = @OldEmail_1
END

IF(@PasswordHash_4 IS NOT NULL AND @PasswordSalt_5 IS NOT NULL)
BEGIN
	UPDATE [User]
		SET passwordHash = @PasswordHash_4, passwordSalt = @PasswordSalt_5
		WHERE email = @OldEmail_1
END


IF(@NewEmail_2 IS NOT NULL)
BEGIN
	UPDATE [User]
		SET email = @NewEmail_2
		WHERE email = @OldEmail_1
END

RETURN 0
GO