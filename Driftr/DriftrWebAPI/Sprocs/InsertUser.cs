using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class InsertUser
	{
		public static void exec(SqlConnection connection, string email, string name, byte[] hash, byte[] salt)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_user] @Email, @Name, @PasswordHash, @PasswordSalt;", connection);
			SqlParameter pEmail = new SqlParameter("@Email", email);
			SqlParameter pName = new SqlParameter("@Name", name);
			SqlParameter pPasswordHash = new SqlParameter("@PasswordHash", hash);
			SqlParameter pPasswordSalt = new SqlParameter("@PasswordSalt", salt);

			command.Parameters.Add(pEmail);
			command.Parameters.Add(pName);
			command.Parameters.Add(pPasswordHash);
			command.Parameters.Add(pPasswordSalt);

			command.ExecuteNonQuery();
		}
	}
}