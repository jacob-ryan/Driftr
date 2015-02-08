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
	public class LocationController : BaseController
	{
		// GET: api/Location
		[Authorize]
		public HttpResponseMessage Get()
		{
			SqlDataReader reader = SprocLocation.getAll(this.connection);
			List<Location> locations = new List<Location>();
			while (reader.Read())
			{
				Location location = new Location();
				location.id = (int) reader["id"];
				location.address = reader["address"].ToString();
				location.city = reader["city"].ToString();
				location.state = reader["state"].ToString();
				location.description = reader["description"].ToString();

				locations.Add(location);
			}
			return Request.CreateResponse(HttpStatusCode.OK, locations);
		}

		// GET: api/Location/<id>
		[Authorize]
		public HttpResponseMessage Get(int id)
		{
			SqlDataReader reader = SprocLocation.get(this.connection, id);
			reader.Read();

			Location location = new Location();
			location.id = (int) reader["id"];
			location.address = reader["address"].ToString();
			location.city = reader["city"].ToString();
			location.state = reader["state"].ToString();
			location.description = reader["description"].ToString();

			return Request.CreateResponse(HttpStatusCode.OK, location);
		}

		// POST: api/Location
		public HttpResponseMessage Post(Location location)
		{
			SprocLocation.add(this.connection, location.address, location.city, location.state, location.description);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

		// PUT: api/Location/<id>
		public HttpResponseMessage Put(int id, Location location)
		{
			SprocLocation.update(this.connection, id, location.address, location.city, location.state, location.description);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}
	}
}