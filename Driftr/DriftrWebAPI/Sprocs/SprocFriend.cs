using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace DriftrWebAPI.Sprocs
{
	public class SprocFriend
	{
		public static SqlDataReader get(SqlConnection connection, string email)
		{
			SqlCommand command = new SqlCommand("EXEC [select_friend_by_user] @Email;", connection);
			command.Parameters.Add(new SqlParameter("@Email", email));

			return command.ExecuteReader();
		}

		public static void add(SqlConnection connection, string userEmailA, string userEmailB, string relation)
		{
			SqlCommand command = new SqlCommand("EXEC [insert_friend] @UserEmailA, @UserEmailB, @Relation;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmailA", userEmailA));
			command.Parameters.Add(new SqlParameter("@UserEmailB", userEmailB));
			command.Parameters.Add(new SqlParameter("@Relation", relation));

			command.ExecuteNonQuery();
		}

		public static void delete(SqlConnection connection, string userEmailA, string userEmailB)
		{
			SqlCommand command = new SqlCommand("EXEC [delete_friend] @UserEmailA, @UserEmailB;", connection);
			command.Parameters.Add(new SqlParameter("@UserEmailA", userEmailA));
			command.Parameters.Add(new SqlParameter("@UserEmailB", userEmailB));

			command.ExecuteNonQuery();
		}
	}
}