USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_all_users', 'P') IS NOT NULL
DROP PROCEDURE [select_all_users]
GO

CREATE PROCEDURE [select_all_users]
AS

SELECT * FROM [User]

RETURN 0
GO