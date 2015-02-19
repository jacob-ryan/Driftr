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
				Location loc = new Location();
				loc.id = (int) reader["id"];
				loc.address = reader["address"].ToString();
				loc.description = reader["description"].ToString();
                loc.latitude = reader["latitude"].ToString();
                loc.longitude = reader["longitude"].ToString();

				locations.Add(loc);
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
			location.description = reader["description"].ToString();
            location.latitude = reader["latitude"].ToString();
            location.longitude = reader["longitude"].ToString();

			return Request.CreateResponse(HttpStatusCode.OK, location);
		}

		// POST: api/Location
		public HttpResponseMessage Post(Location location)
		{
			SprocLocation.add(this.connection, location.address, location.description, location.latitude, location.longitude);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

		// PUT: api/Location/<id>
		public HttpResponseMessage Put(int id, Location location)
		{
			SprocLocation.update(this.connection, id, location.address, location.description, location.latitude, location.longitude);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

        //PUT: api/Location?id=<id>&description=<description>
        public HttpResponseMessage Put(int id, string description)
        {
            SprocLocation.update(this.connection, id, description);
            return Request.CreateResponse(HttpStatusCode.Created, true);
        }

        // DELETE: api/Location?id=<id>
        public HttpResponseMessage Delete(int id)
        {
            int rows = SprocLocation.delete(this.connection, id);
            return Request.CreateResponse(HttpStatusCode.Created, rows);
        }
	}
}