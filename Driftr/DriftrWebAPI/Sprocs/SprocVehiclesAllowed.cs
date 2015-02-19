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
			SqlCommand command = new SqlCommand("EXEC [select_vehicles_allowed];", connection);

			return command.ExecuteReader();
		}
	}
}