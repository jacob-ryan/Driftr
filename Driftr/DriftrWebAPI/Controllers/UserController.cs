using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DriftrWebAPI.Helpers;
using DriftrWebAPI.Models;
using DriftrWebAPI.Sprocs;

namespace DriftrWebAPI.Controllers
{
	public class UserController : BaseController
	{
		// GET: api/User
		[Authorize]
		public IEnumerable<User> Get()
		{
			SqlDataReader reader = GetUser.exec(this.connection);
			List<User> users = new List<User>();
			while (reader.Read())
			{
				User user = new User();
				user.email = reader["email"].ToString();
				user.name = reader["name"].ToString();
				users.Add(user);
			}
			return users;
		}

		// GET: api/User?email=abc@xyz.com
		[Authorize]
		public User Get(string email)
		{
			IEnumerable<User> users = Get();
			return users.First(u => u.email == email);
		}

		// POST: api/User
		[Authorize]
		public void Post(string password, User user)
		{
			byte[] salt = Passwords.createSalt(password);
			byte[] hash = Passwords.createHash(password, salt);

			InsertUser.exec(this.connection, user.email, user.name, hash, salt);
		}

		// PUT: api/User/5
		[Authorize]
		public void Put(int id, string password, User user)
		{
		}

		// DELETE: api/User/5
		[Authorize]
		public void Delete(int id)
		{
		}
	}
}