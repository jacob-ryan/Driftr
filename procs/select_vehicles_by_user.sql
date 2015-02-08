USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_vehicles_by_user', 'P') IS NOT NULL
DROP PROCEDURE [select_vehicle_by_user]
GO

CREATE PROCEDURE [select_vehicles_by_user]
@email_1 varchar(255)
AS

IF (((SELECT count(*) FROM [User] WHERE email = @email_1)) = 0 OR @email_1 IS NULL)
BEGIN
	PRINT 'Email does not exist'
	RETURN 1
END

SELECT * FROM [Vehicle]
WHERE userEmail = @email_1

RETURN 0
GO