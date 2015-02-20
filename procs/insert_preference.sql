USE [333-2014-Driftr]
GO

IF OBJECT_ID('insert_preference', 'P') IS NOT NULL
DROP PROCEDURE [insert_preference]
GO

CREATE PROCEDURE [insert_preference]
(@eventId_1 int,
 @field_2 varchar(255),
 @entries_3 varchar(max),
 @isWhitelist_4 bit)
AS

-- Check if parameters are valid --

IF (@eventId_1 IS NULL)
BEGIN
	PRINT 'EventId does not exist'
	RETURN 1
END

IF (@field_2 IS NULL)
BEGIN
	PRINT 'Field not valid'
	RETURN 2
END

IF (@entries_3 IS NULL)
BEGIN
	PRINT 'Entries not valid'
	RETURN 3
END

IF (@isWhitelist_4 IS NULL)
BEGIN
	PRINT 'isWhitelist not valid'
	RETURN 4
END

-- Insert into Preferences Table --

INSERT INTO [Preferences]
([eventId], [field], [entries], [isWhitelist])
VALUES (@eventId_1, @field_2, @entries_3, @isWhitelist_4)

RETURN 0
GO