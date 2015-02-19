using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class SprocEvent
	{
		public static SqlDataReader getAll(SqlConnection connection)
		{
			SqlCommand command = new SqlCommand("EXEC [select_all_events];", connection);

			return command.ExecuteReader();
		}

		public static SqlDataReader getAllByUser(SqlConnection connection, string email)
		{
			SqlCommand command = new SqlCommand("EXEC [select_events_by_user] @Email;", connection);
			command.Parameters.Add(new SqlParameter("@Email", email));

			return command.ExecuteReader();
		}

		public static SqlDataReader get(SqlConnection connection, int id)
		{
			SqlCommand command = new SqlCommand("EXEC [select_event] @Id;", connection);
			command.Parameters.Add(new SqlParameter("@Id", id));

			return command.ExecuteReader();
		}

		public static void add(SqlConnection connection, string userEmail, int locationId, DateTime eventDate, string theme, string description, bool wasBusted)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_event] @UserEmail, @LocationId, @EventDate, @Theme, @Description, @WasBusted;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmail", userEmail));
			command.Parameters.Add(new SqlParameter("@LocationId", locationId));
			command.Parameters.Add(new SqlParameter("@EventDate", eventDate));
			command.Parameters.Add(new SqlParameter("@Theme", theme));
			command.Parameters.Add(new SqlParameter("@Description", description));
			command.Parameters.Add(new SqlParameter("@WasBusted", wasBusted));

			command.ExecuteNonQuery();
		}

		public static void update(SqlConnection connection, int id, string userEmail, int locationId, DateTime eventDate, string theme, string description, bool wasBusted)
		{
			SqlCommand command = new SqlCommand("EXEC [update_event] @Id, @LocationId, @EventDate, @Theme, @Description, @WasBusted;", connection);
			command.Parameters.Add(new SqlParameter("@Id", id));
			//command.Parameters.Add(new SqlParameter("@UserEmail", userEmail));
			command.Parameters.Add(new SqlParameter("@LocationId", locationId));
			command.Parameters.Add(new SqlParameter("@EventDate", eventDate));
			command.Parameters.Add(new SqlParameter("@Theme", theme));
			command.Parameters.Add(new SqlParameter("@Description", description));
			command.Parameters.Add(new SqlParameter("@WasBusted", wasBusted));

			command.ExecuteNonQuery();
		}
	}
}