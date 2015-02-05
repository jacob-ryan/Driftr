using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class GetUser
	{
		public static SqlDataReader exec(SqlConnection connection)
		{
			SqlCommand command = new SqlCommand("EXEC [get_users]", connection);
			return command.ExecuteReader();
		}
	}
}