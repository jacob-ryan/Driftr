using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class SprocUser
	{
		public static SqlDataReader getAll(SqlConnection connection)
		{
			SqlCommand command = new SqlCommand("EXEC [select_all_users]", connection);

			return command.ExecuteReader();
		}

		public static SqlDataReader get(SqlConnection connection, string email)
		{
			SqlCommand command = new SqlCommand("EXEC [select_user] @Email", connection);
			command.Parameters.Add(new SqlParameter("@Email", email));

			return command.ExecuteReader();
		}

		public static void add(SqlConnection connection, string email, string name, byte[] hash, byte[] salt)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_user] @Email, @Name, @PasswordHash, @PasswordSalt;", connection);
			command.Parameters.Add(new SqlParameter("@Email", email));
			command.Parameters.Add(new SqlParameter("@Name", name));
			command.Parameters.Add(new SqlParameter("@PasswordHash", hash));
			command.Parameters.Add(new SqlParameter("@PasswordSalt", salt));

			command.ExecuteNonQuery();
		}

		public static void update(SqlConnection connection, string email, string name, byte[] hash, byte[] salt)
		{
			SqlCommand command = new SqlCommand("EXEC [update_user] @Email, @Name, @PasswordHash, @PasswordSalt;", connection);
			command.Parameters.Add(new SqlParameter("@Email", email));
			command.Parameters.Add(new SqlParameter("@Name", name));
			command.Parameters.Add(new SqlParameter("@PasswordHash", hash));
			command.Parameters.Add(new SqlParameter("@PasswordSalt", salt));

			command.ExecuteNonQuery();
		}
	}
}