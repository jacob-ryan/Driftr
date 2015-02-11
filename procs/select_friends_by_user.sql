USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_friends_by_user', 'P') IS NOT NULL
DROP PROCEDURE [select_friends_by_user]
GO

CREATE PROCEDURE [select_friends_by_user]
@email_1 varchar(255)
AS

IF ( @email_1 IS NULL )
BEGIN
	PRINT 'No email provided'
	RETURN 1
END

IF (((SELECT count(*) FROM [Friend] WHERE userEmailA = @email_1)) = 0 AND ((SELECT count(*) FROM [Friend] WHERE userEmailB = @email_1)) = 0)
BEGIN
	PRINT 'User email does not exist'
	RETURN 2
END

DECLARE @all_friends TABLE(userEmailA varchar(255), userEmailB varchar(255), relation varchar(255))

INSERT INTO @all_friends
SELECT userEmailA, userEmailB, relation  FROM dbo.Friend 
WHERE userEmailA = @email_1

INSERT INTO @all_friends
SELECT userEmailB, userEmailA, relation FROM dbo.Friend 
WHERE userEmailB = @email_1

SELECT * FROM @all_friends

RETURN 0
GO