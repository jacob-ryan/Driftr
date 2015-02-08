USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_all_events', 'P') IS NOT NULL
DROP PROCEDURE [select_all_events]
GO

CREATE PROCEDURE [select_all_events]
AS

SELECT * FROM [Event]

RETURN 0
GO