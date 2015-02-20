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
	public class FriendController : BaseController
	{
		// GET: api/Friend?email=<email>
		[Authorize]
		public HttpResponseMessage Get(string email)
		{
			SqlDataReader reader = SprocFriend.get(this.connection, email);
			List<Friend> friends = new List<Friend>();
			while (reader.Read())
			{
				Friend friend = new Friend();
				friend.userEmailA = reader["userEmailA"].ToString();
				friend.userEmailB = reader["userEmailB"].ToString();
				friend.relation = reader["relation"].ToString();

				friends.Add(friend);
			}
			return Request.CreateResponse(HttpStatusCode.OK, friends);
		}

		// POST: api/Friend
		public HttpResponseMessage Post(Friend friend)
		{
			try
			{
				SprocFriend.add(this.connection, friend.userEmailA, friend.userEmailB, friend.relation);
				return Request.CreateResponse(HttpStatusCode.Created, true);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
			}
		}

		// DELETE: api/Friend?email=<email>&otherEmail=<otherEmail>
		public HttpResponseMessage Delete(string email, string otherEmail)
		{
			SprocFriend.delete(this.connection, email, otherEmail);
			return Request.CreateResponse(HttpStatusCode.NoContent);
		}
	}
}