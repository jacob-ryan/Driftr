USE [333-2014-Driftr]
GO
/*
DROP PROCEDURE [update_vehicle]
GO
*/
CREATE PROCEDURE [update_vehicle]
(@id_1 int,
 @active_2 bit=NULL,
 @color_3 varchar(100)=NULL,
 @description_4 varchar(MAX)=NULL)
AS

-- Check if parameters are valid --

IF (@id_1 IS NULL) OR ((SELECT count(*) FROM [Vehicle] WHERE id = @id_1) <= 0)
BEGIN
	PRINT 'Vehicle id not valid'
	RETURN 1
END

-- Update if parameters aren't null --

IF (@active_2 IS NOT NULL)
BEGIN
	UPDATE [Vehicle]
		SET active = @active_2
		WHERE id = @id_1
END

IF (@color_3 IS NOT NULL)
BEGIN
	UPDATE [Vehicle]
		SET color = @color_3
		WHERE id = @id_1
END

IF (@description_4 IS NOT NULL)
BEGIN
	UPDATE [Vehicle]
		SET description = @description_4
		WHERE id = @id_1
END

RETURN 0

GO