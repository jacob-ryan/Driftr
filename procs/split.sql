USE [333-2014-Driftr]
GO

/*CREATE FUNCTION [dbo].[Split]
(
    @String NVARCHAR(4000),
    @Delimiter NCHAR(1)
)
RETURNS TABLE
AS
RETURN
(
    WITH Split(stpos,endpos)
    AS(
        SELECT 0 AS stpos, CHARINDEX(@Delimiter,@String) AS endpos
        UNION ALL
        SELECT endpos+1, CHARINDEX(@Delimiter,@String,endpos+1)
            FROM Split
            WHERE endpos > 0
    )
    SELECT 'Id' = ROW_NUMBER() OVER (ORDER BY (SELECT 1)),
        'Data' = SUBSTRING(@String,stpos,COALESCE(NULLIF(endpos,0),LEN(@String)+1)-stpos)
    FROM Split
)
GO*/

/*DECLARE @DelimitedString NVARCHAR(128)
SET @DelimitedString = 'Honda,Ford,Toyota'
SELECT * FROM dbo.Split(@DelimitedString, ',')*/
DECLARE @email VARCHAR(255)
SET @email = 'joe@cool.com'

DECLARE @Makes VARCHAR(255)
SET @Makes = 'Honda,Ford,Toyota'

SELECT * FROM Vehicle v
INNER JOIN dbo.Split(@Makes, ',') AS split
ON v.make = split.[DATA]
WHERE v.userEmail = @email