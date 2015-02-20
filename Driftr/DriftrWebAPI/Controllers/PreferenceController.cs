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
		// GET: api/Preference/<id>
		[Authorize]
		public HttpResponseMessage Get(int id)
		{
			SqlDataReader reader = SprocPreference.get(this.connection, id);
			List<Preference> preferences = new List<Preference>();
			while (reader.Read())
			{
				Preference preference = new Preference();
				preference.eventId = (int) reader["eventId"];
				preference.field = reader["field"].ToString();
				preference.entries = reader["entries"].ToString();
				preference.isWhitelist = (bool) reader["isWhitelist"];

				preferences.Add(preference);
			}
			return Request.CreateResponse(HttpStatusCode.OK, preferences);
		}

		// POST: api/Preference
		public HttpResponseMessage Post(Preference preference)
		{
			SprocPreference.add(this.connection, preference.eventId, preference.field, preference.entries, preference.isWhitelist);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

		// DELETE: api/Preference
		public HttpResponseMessage Delete(Preference preference)
		{
			SprocPreference.delete(this.connection, preference.eventId, preference.field);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}
	}
}