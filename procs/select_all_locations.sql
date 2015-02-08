USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_all_locations', 'P') IS NOT NULL
DROP PROCEDURE [select_all_locations]
GO

CREATE PROCEDURE [select_all_locations]
AS

SELECT * FROM [Locations]

RETURN 0
GO