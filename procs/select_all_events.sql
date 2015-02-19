USE [333-2014-Driftr]
GO

IF OBJECT_ID('select_all_events', 'P') IS NOT NULL
DROP PROCEDURE [select_all_events]
GO

CREATE PROCEDURE [select_all_events]
AS

SELECT e.id, e.userEmail, e.locationId, e.eventDate, e.theme, e.description, e.wasBusted, l.address FROM [Event] e, [Location] l
WHERE e.locationId = l.id

RETURN 0
GO