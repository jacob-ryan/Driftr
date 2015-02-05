using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class SprocVehicle
	{
		public static SqlDataReader get(SqlConnection connection, string email)
		{
			SqlCommand command = new SqlCommand("EXEC [select_vehicle_by_user] @Email", connection);
			command.Parameters.Add(new SqlParameter("@Email", email));

			return command.ExecuteReader();
		}

		public static void add(SqlConnection connection, string userEmail, bool active, string make, string model, int year, string color, string description)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_vehicle] @UserEmail, @Active, @Make, @Model, @Year, @Color, @Description;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmail", userEmail));
			command.Parameters.Add(new SqlParameter("@Active", active));
			command.Parameters.Add(new SqlParameter("@Make", make));
			command.Parameters.Add(new SqlParameter("@Model", model));
			command.Parameters.Add(new SqlParameter("@Year", year));
			command.Parameters.Add(new SqlParameter("@Color", color));
			command.Parameters.Add(new SqlParameter("@Description", description));

			command.ExecuteNonQuery();
		}

		public static void update(SqlConnection connection, string userEmail, bool active, string make, string model, int year, string color, string description)
		{
			SqlCommand command = new SqlCommand("EXEC [update_vehicle] @UserEmail, @Active, @Make, @Model, @Year, @Color, @Description;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmail", userEmail));
			command.Parameters.Add(new SqlParameter("@Active", active));
			command.Parameters.Add(new SqlParameter("@Make", make));
			command.Parameters.Add(new SqlParameter("@Model", model));
			command.Parameters.Add(new SqlParameter("@Year", year));
			command.Parameters.Add(new SqlParameter("@Color", color));
			command.Parameters.Add(new SqlParameter("@Description", description));

			command.ExecuteNonQuery();
		}
	}
}