using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class SprocVehiclesAllowed
	{
		public static SqlDataReader get(SqlConnection connection, string userEmail, int eventId)
		{
			SqlCommand command = new SqlCommand("EXEC [vehicles_allowed] @UserEmail, @EventId;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmail", userEmail));
			command.Parameters.Add(new SqlParameter("@EventId", eventId));

			return command.ExecuteReader();
		}
	}
}