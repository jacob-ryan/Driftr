USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_all_vehicles', 'P') IS NOT NULL
DROP PROCEDURE [select_all_vehicles]
GO

CREATE PROCEDURE [select_all_vehicles]
AS

SELECT * FROM [Vehicle]

RETURN 0
GO