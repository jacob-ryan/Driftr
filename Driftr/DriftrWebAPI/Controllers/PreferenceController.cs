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
	public class PreferenceController : BaseController
	{
		// GET: api/Preference?email=<email>
		[Authorize]
		public HttpResponseMessage Get(string email)
		{
			SqlDataReader reader = SprocPreference.get(this.connection, email);
			List<Preference> preferences = new List<Preference>();
			while (reader.Read())
			{
				Preference preference = new Preference();
				preference.id = (int) reader["id"];
				preference.userEmail = reader["userEmail"].ToString();
				preference.type = reader["type"].ToString();
				preference.key = reader["key"].ToString();
				preference.value = reader["value"].ToString();
				preference.rating = (int) reader["rating"];

				preferences.Add(preference);
			}
			return Request.CreateResponse(HttpStatusCode.OK, preferences);
		}

		// POST: api/Preference
		public HttpResponseMessage Post(Preference preference)
		{
			//SprocVehicle.add(this.connection, preference.
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

		// PUT: api/Vehicle/<id>
		public HttpResponseMessage Put(int id, Vehicle vehicle)
		{
			SprocVehicle.update(this.connection, id, vehicle.userEmail, vehicle.active, vehicle.make, vehicle.model, vehicle.year, vehicle.color, vehicle.description);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}
	}
}