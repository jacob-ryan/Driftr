using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class SprocLocation
	{
		public static SqlDataReader getAll(SqlConnection connection)
		{
			SqlCommand command = new SqlCommand("EXEC [select_all_locations]", connection);

			return command.ExecuteReader();
		}

		public static SqlDataReader get(SqlConnection connection, int id)
		{
			SqlCommand command = new SqlCommand("EXEC [select_location] @Id", connection);
			command.Parameters.Add(new SqlParameter("@Id", id));

			return command.ExecuteReader();
		}

		public static void add(SqlConnection connection, string address, string city, string state, string description)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_vehicle] @Address, @City, @State, @Description;", connection);
			command.Parameters.Add(new SqlParameter("@Address", address));
			command.Parameters.Add(new SqlParameter("@City", city));
			command.Parameters.Add(new SqlParameter("@State", state));
			command.Parameters.Add(new SqlParameter("@Description", description));

			command.ExecuteNonQuery();
		}

		public static void update(SqlConnection connection, int id, string address, string city, string state, string description)
		{
			SqlCommand command = new SqlCommand("EXEC [update_vehicle] @Id, @Address, @City, @State, @Description;", connection);
			command.Parameters.Add(new SqlParameter("@Id", id));
			command.Parameters.Add(new SqlParameter("@Address", address));
			command.Parameters.Add(new SqlParameter("@City", city));
			command.Parameters.Add(new SqlParameter("@State", state));
			command.Parameters.Add(new SqlParameter("@Description", description));

			command.ExecuteNonQuery();
		}
	}
}