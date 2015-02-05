USE [333-2014-Driftr]
GO

IF OBJECT_ID('delete_friend', 'P') IS NOT NULL
DROP PROCEDURE [delete_Friend]
GO

CREATE PROCEDURE [delete_friend]
	@userEmailA_1 varchar(255),
	@userEmailB_2 varchar(255)
AS

-- Check if parameters are valid --
IF (@userEmailA_1 IS NULL) OR ((SELECT count(*) FROM [Friend] WHERE userEmailA = @userEmailA_1) <= 0)
BEGIN
	PRINT 'Email ' + @userEmailA_1 + ' does not exist'
	RETURN 1
END

IF (@userEmailB_2 IS NULL) OR ((SELECT count(*) FROM [Friend] WHERE userEmailB = @userEmailB_2) <= 0)
BEGIN
	PRINT 'Email ' + @userEmailB_2 + ' does not exist'
	RETURN 1
END

-- Insert into Friend Table --
DELETE FROM [Friend]
WHERE userEmailA = @userEmailA_1 AND userEmailB = @userEmailB_2

RETURN 0