USE [333-2014-Driftr]
GO

/****** Object:  Table [dbo].[Vehicle]    Script Date: 1/28/2015 3:06:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Vehicle](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userEmail] [varchar](255) NOT NULL,
	[active] [bit] NOT NULL,
	[make] [varchar](255) NOT NULL,
	[model] [varchar](255) NOT NULL,
	[year] [varchar](255) NOT NULL,
	[color] [varchar](255) NOT NULL,
	[description] [varchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Vehicle]  WITH CHECK ADD FOREIGN KEY([userEmail])
REFERENCES [dbo].[User] ([email])
GO

