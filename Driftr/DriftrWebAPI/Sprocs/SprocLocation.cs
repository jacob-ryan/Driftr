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

		public static void add(SqlConnection connection, string address, string description, string latitude, string longitude)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_location] @Address, @Description, @latitude, @longitude;", connection);
			command.Parameters.Add(new SqlParameter("@Address", address));
			command.Parameters.Add(new SqlParameter("@Description", description));
            command.Parameters.Add(new SqlParameter("@latitude", latitude));
            command.Parameters.Add(new SqlParameter("@longitude", longitude));


			command.ExecuteNonQuery();
		}

        public static void update(SqlConnection connection, int id, string address, string description, string latitude, string longitude)
		{
			SqlCommand command = new SqlCommand("EXEC [update_location] @Id, @Address, @Description, @latitude, @longitude;", connection);
			command.Parameters.Add(new SqlParameter("@Id", id));
			command.Parameters.Add(new SqlParameter("@Address", address));
			command.Parameters.Add(new SqlParameter("@Description", description));
            command.Parameters.Add(new SqlParameter("@latitude", latitude));
            command.Parameters.Add(new SqlParameter("@longitude", longitude));

			command.ExecuteNonQuery();
		}
        public static void update(SqlConnection connection, int id, string description)
        {
            SqlCommand command = new SqlCommand("EXEC [update_location_description] @Id, @Description;", connection);
            command.Parameters.Add(new SqlParameter("@Id", id));
            command.Parameters.Add(new SqlParameter("@Description", description));

            command.ExecuteNonQuery();
        }

        public static int delete(SqlConnection connection, int id)
        {
            SqlCommand command = new SqlCommand("EXEC [delete_location] @id", connection);
            command.Parameters.Add(new SqlParameter("@id", id));

            return command.ExecuteNonQuery();
        }
	}
}