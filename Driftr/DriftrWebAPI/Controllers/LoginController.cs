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
		public HttpResponseMessage Get()
		{
			return Request.CreateResponse(HttpStatusCode.OK, CurrentUser.get());
		}

		// POST: api/Login
		public HttpResponseMessage Post(Login login)
		{
			SqlDataReader reader = SprocUser.get(this.connection, login.email);
			reader.Read();
			if (reader["email"].ToString() == login.email)
			{
				byte[] hash = (byte[]) reader["passwordHash"];
				byte[] salt = (byte[]) reader["passwordSalt"];

				byte[] testHash = Passwords.createHash(login.password, salt);
				if (testHash.SequenceEqual(hash))
				{
					FormsAuthentication.SetAuthCookie(login.email, true);
					return Request.CreateResponse(HttpStatusCode.Created, true);
				}
				else
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid username/password");
				}
			}
			else
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, "Unknown username");
			}
		}

		// DELETE: api/Login
		[Authorize]
		public HttpResponseMessage Delete()
		{
			FormsAuthentication.SignOut();
			return Request.CreateResponse(HttpStatusCode.NoContent);
		}
	}
}