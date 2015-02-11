USE [333-2014-Driftr]
GO

IF OBJECT_ID('insert_friend', 'P') IS NOT NULL
DROP PROCEDURE [insert_friend]
GO

CREATE PROCEDURE [insert_friend]
	@userEmailA_1 varchar(255),
	@userEmailB_2 varchar(255),
	@relation_3 varchar(255)
AS

-- Check if parameters are valid --
IF (@userEmailA_1 IS NULL) OR ((SELECT count(*) FROM [User] WHERE email = @userEmailA_1) <= 0)
BEGIN
	PRINT 'Email ' + @userEmailA_1 + ' does not exist'
	RETURN 1
END

IF (@userEmailB_2 IS NULL) OR ((SELECT count(*) FROM [User] WHERE email = @userEmailB_2) <= 0)
BEGIN
	PRINT 'Email ' + @userEmailB_2 + ' does not exist'
	RETURN 1
END

IF (@relation_3 IS NULL OR LEN(@relation_3)<=0 OR LEN(@relation_3)>255)
BEGIN
	PRINT 'Relation not valid'
	RETURN 3
END

IF(((SELECT count(*) FROM [Friend] WHERE userEmailA = @userEmailA_1 AND userEmailB = @userEmailB_2) > 0) OR 
	(SELECT count(*) FROM [Friend] WHERE userEmailB = @userEmailA_1 AND userEmailA = @userEmailB_2) > 0)
BEGIN
	PRINT 'Friend already exists'
	RETURN 4
END

-- Insert into User Table --
INSERT INTO [Friend]
([userEmailA], [userEmailB], [relation])
VALUES (@userEmailA_1, @userEmailB_2, @relation_3)

RETURN 0