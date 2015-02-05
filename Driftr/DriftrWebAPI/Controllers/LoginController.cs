using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;
using DriftrWebAPI.Helpers;
using DriftrWebAPI.Models;
using DriftrWebAPI.Sprocs;

namespace DriftrWebAPI.Controllers
{
	public class LoginController : BaseController
	{
		// GET: api/Login
		[Authorize]
		public User Get()
		{
			return CurrentUser.get();
		}

		// POST: api/Login
		[Authorize]
		public void Post(Login login)
		{
			SqlDataReader reader = GetUser.exec(this.connection);
			while (reader.Read())
			{
				if (reader["email"].ToString() == login.email)
				{
					byte[] hash = (byte[]) reader["hash"];
					byte[] salt = (byte[]) reader["salt"];

					byte[] testHash = Passwords.createHash(login.password, salt);
					if (testHash.SequenceEqual(hash))
					{
						FormsAuthentication.SetAuthCookie(login.email, true);
					}
					else
					{
						throw new Exception("Invalid username/password");
					}
					return;
				}
			}
		}

		// DELETE: api/Login
		[Authorize]
		public void Delete()
		{
			FormsAuthentication.SignOut();
		}
	}
}