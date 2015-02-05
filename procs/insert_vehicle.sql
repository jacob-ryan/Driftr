USE [333-2014-Driftr]
GO

CREATE PROCEDURE [insert_vehicle]
(@userEmail_1 varchar(255),
 @active_2 bit=1,
 @make_3 varchar(100)=NULL,
 @model_4 varchar=NULL,
 @year_5 varchar(4)=NULL,
 @color_6 varchar(100)=NULL,
 @description_7 varchar(MAX)=NULL)
AS

-- Check if parameters are valid --

IF (@userEmail_1 IS NULL) OR ((SELECT count(*) FROM [User] WHERE email = @UserEmail_1) <= 0)
BEGIN
	PRINT 'Email ' + @UserEmail_1 + ' does not exist'
	RETURN 1
END

IF (NOT LEN(@year_5) = 4)
BEGIN
	PRINT 'Year not valid'
	RETURN 2
END

-- Insert into User Table --

INSERT INTO [Vehicle]
([userEmail], [active], [make], [model], [year], [color], [description])
VALUES (@userEmail_1, @active_2, @make_3, @model_4, @year_5, @color_6, @description_7)

RETURN 0

GO