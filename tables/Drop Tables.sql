USE [333-2014-Driftr]
GO

DROP TABLE [Preferences]
DROP TABLE [EventParticipant]
DROP TABLE [Event]
DROP TABLE [Location]
DROP TABLE [Friend]
DROP TABLE [Vehicle]
DROP TABLE [User]

-------------------------------------------------------
-- INDEXES --
-------------------------------------------------------

DROP INDEX index_Vehicle_make ON [Vehicle]
DROP INDEX index_Vehicle_model ON [Vehicle]
DROP INDEX index_Vehicle_color ON [Vehicle]