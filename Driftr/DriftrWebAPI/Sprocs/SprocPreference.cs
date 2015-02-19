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
		public static SqlDataReader get(SqlConnection connection, string email)
		{
			SqlCommand command = new SqlCommand("EXEC [select_preferences_by_user] @Email", connection);
			command.Parameters.Add(new SqlParameter("@Email", email));

			return command.ExecuteReader();
		}

		public static void add(SqlConnection connection, string userEmail, string type, string key, string value, int rating)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_preference] @Email, @Type, @Key, @Value, @Rating;", connection);
			command.Parameters.Add(new SqlParameter("@Email", userEmail));
			command.Parameters.Add(new SqlParameter("@Type", type));
			command.Parameters.Add(new SqlParameter("@Key", key));
			command.Parameters.Add(new SqlParameter("@Value", value));
			command.Parameters.Add(new SqlParameter("@Rating", rating));

			command.ExecuteNonQuery();
		}

		public static void delete(SqlConnection connection, int id)
		{
			SqlCommand command = new SqlCommand("EXEC [delete_preference] @Id", connection);
			command.Parameters.Add(new SqlParameter("@Id", id));

			command.ExecuteNonQuery();
		}
	}
}