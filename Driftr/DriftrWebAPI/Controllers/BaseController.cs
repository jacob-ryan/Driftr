﻿using System;
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
			string username = "333Winter2014Driftr";
			string password = "driftr";
			string server = "titan.csse.rose-hulman.edu";
			string database = "333-2014-Driftr";
			string connectionString = "user id=" + username + ";"
				+ "password=" + password + ";"
				+ "server=" + server + ";"
				+ "Trusted_Connection=false;"
				+ "database=" + database + ";"
				+ "connection timeout=10";

			//connectionString = "server=(local)\\SQLEXPRESS;Trusted_Connection=true;database=Driftr;";

			this.connection = new SqlConnection(connectionString);
			this.connection.Open();
		}

		protected override void Dispose(bool disposing)
		{
			this.connection.Close();
			this.connection.Dispose();
			SqlConnection.ClearPool(this.connection);
			base.Dispose(disposing);
		}
	}
}