using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace DriftrWebAPI.Controllers
{
	public class BaseController : ApiController
	{
		public SqlConnection connection;

		public BaseController()
		{
			string username = "";
			string password = "";
			string server = "";
			string database = "";
			string connectionString = "user id=" + username + ";"
				+ "password=" + password + ";"
				+ "server=" + server + ";"
				+ "Trusted_Connection=yes;"
				+ "database=" + database + ";"
				+ "connection timeout=30";
			this.connection = new SqlConnection(connectionString);
		}

		public void Dispose()
		{
			this.connection.Dispose();
			base.Dispose();
		}
	}
}