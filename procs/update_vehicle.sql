USE [333-2014-Driftr]
GO

IF OBJECT_ID('update_vehicle', 'P') IS NOT NULL
DROP PROCEDURE [update_vehicle]
GO

CREATE PROCEDURE [update_vehicle]
(@id_1 int = NULL,
 @userEmail_2 varchar(255) = NULL,
 @active_3 bit = NULL,
 @make_4 varchar(255) = NULL,
 @model_5 varchar(255) = NULL,
 @year_6 int = NULL,
 @color_7 varchar(255)=NULL,
 @description_8 varchar(MAX)=NULL)
AS

-- Check if parameters are valid --

IF (@id_1 IS NULL) OR ((SELECT count(*) FROM [Vehicle] WHERE id = @id_1) <= 0)
BEGIN
	PRINT 'Vehicle id not valid'
	RETURN 1
END

IF (@userEmail_2 IS NULL) OR ((SELECT count(*) FROM [USER] WHERE email = @userEmail_2) <= 0)
BEGIN
	PRINT 'User email null or invalid'
	RETURN 2
END

-- Update if parameters aren't null --

IF (@active_3 IS NOT NULL)
BEGIN
	UPDATE [Vehicle]
		SET active = @active_3
		WHERE id = @id_1
END

IF (@make_4 IS NOT NULL)
BEGIN
	UPDATE [Vehicle]
		SET make = @make_4
		WHERE id = @id_1
END

IF (@model_5 IS NOT NULL)
BEGIN
	UPDATE [Vehicle]
		SET model = @model_5
		WHERE id = @id_1
END

IF (@year_6 IS NOT NULL AND LEN(@year_6) = 4)
BEGIN
	UPDATE [Vehicle]
		SET year = @year_6
		WHERE id = @id_1
END

IF (@color_7 IS NOT NULL)
BEGIN
	UPDATE [Vehicle]
		SET color = @color_7
		WHERE id = @id_1
END

IF (@description_8 IS NOT NULL)
BEGIN
	UPDATE [Vehicle]
		SET description = @description_8
		WHERE id = @id_1
END

RETURN 0

GO