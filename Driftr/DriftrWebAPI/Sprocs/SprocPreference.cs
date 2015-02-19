using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class SprocPreference
	{
		public static SqlDataReader get(SqlConnection connection, int eventId)
		{
			SqlCommand command = new SqlCommand("EXEC [select_preferences] @EventId;", connection);
			command.Parameters.Add(new SqlParameter("@EventId", eventId));

			return command.ExecuteReader();
		}

		public static void add(SqlConnection connection, int eventId, string field, string entries, bool isWhitelist)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_preference] @EventId, @Field, @Entries, @IsWhitelist;", connection);
			command.Parameters.Add(new SqlParameter("@EventId", eventId));
			command.Parameters.Add(new SqlParameter("@Field", field));
			command.Parameters.Add(new SqlParameter("@Entries", entries));
			command.Parameters.Add(new SqlParameter("@IsWhitelist", isWhitelist));

			command.ExecuteNonQuery();
		}

		public static void delete(SqlConnection connection, int eventId, string field)
		{
			SqlCommand command = new SqlCommand("EXEC [delete_preference] @EventId, @Field;", connection);
			command.Parameters.Add(new SqlParameter("@EventId", eventId));
			command.Parameters.Add(new SqlParameter("@Field", field));

			command.ExecuteNonQuery();
		}
	}
}