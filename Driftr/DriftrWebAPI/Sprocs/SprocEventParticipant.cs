using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class SprocEventParticipant
	{
		public static SqlDataReader get(SqlConnection connection, int eventId)
		{
			SqlCommand command = new SqlCommand("EXEC [select_eventParticipants] @EventId;", connection);
			command.Parameters.Add(new SqlParameter("@EventId", eventId));

			return command.ExecuteReader();
		}

		public static void add(SqlConnection connection, string userEmail, int eventId, int? placement)
		{
			SqlCommand command = new SqlCommand("EXEC @RETURN_VALUE = [insert_eventParticipant] @UserEmail, @EventId, @Placement;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmail", userEmail));
			command.Parameters.Add(new SqlParameter("@EventId", eventId));
			command.Parameters.Add(new SqlParameter("@Placement", placement));

			command.Parameters.Add(new SqlParameter("@RETURN_VALUE", SqlDbType.Int)).Direction = ParameterDirection.Output;

			command.ExecuteReader();

			int returnValue = (int) command.Parameters["@RETURN_VALUE"].Value;
			if (returnValue != 0)
			{
				throw new Exception("Error adding event participant");
			}
		}

		public static void update(SqlConnection connection, string userEmail, int eventId, int? placement)
		{
			SqlCommand command = new SqlCommand("EXEC [update_eventParticipant] @UserEmail, @EventId, @Placement;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmail", userEmail));
			command.Parameters.Add(new SqlParameter("@EventId", eventId));
			command.Parameters.Add(new SqlParameter("@Placement", placement));

			command.ExecuteNonQuery();
		}

		public static void delete(SqlConnection connection, string userEmail, int eventId)
		{
			SqlCommand command = new SqlCommand("EXEC [delete_eventParticipant] @UserEmail, @EventId;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmail", userEmail));
			command.Parameters.Add(new SqlParameter("@EventId", eventId));

			command.ExecuteNonQuery();
		}
	}
}