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
	public class EventController : BaseController
	{
		// GET: api/Event
		[Authorize]
		public HttpResponseMessage Get()
		{
			SqlDataReader reader = SprocEvent.getAll(this.connection);
			List<Event> events = new List<Event>();
			while (reader.Read())
			{
				Event e = new Event();
				e.id = (int) reader["id"];
				e.userEmail = reader["userEmail"].ToString();
				e.locationId = (int) reader["locationId"];
				e.date = (DateTime) reader["eventDate"];
				e.theme = reader["theme"].ToString();
				e.description = reader["description"].ToString();
				e.wasBusted = (bool) reader["wasBusted"];

				events.Add(e);
			}
			return Request.CreateResponse(HttpStatusCode.OK, events);
		}

		// GET: api/Event/<id>
		[Authorize]
		public HttpResponseMessage Get(int id)
		{
			SqlDataReader reader = SprocEvent.get(this.connection, id);
			reader.Read();

			Event e = new Event();
			e.id = (int) reader["id"];
			e.userEmail = reader["userEmail"].ToString();
			e.locationId = (int) reader["locationId"];
			e.date = (DateTime) reader["eventDate"];
			e.theme = reader["theme"].ToString();
			e.description = reader["description"].ToString();
			e.wasBusted = (bool) reader["wasBusted"];

			return Request.CreateResponse(HttpStatusCode.OK, e);
		}

		// POST: api/Event
		public HttpResponseMessage Post(Event e)
		{
			SprocEvent.add(this.connection, e.userEmail, e.locationId, e.date, e.theme, e.description, e.wasBusted);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

		// PUT: api/Event/<id>
		public HttpResponseMessage Put(int id, Event e)
		{
			SprocEvent.update(this.connection, id, e.userEmail, e.locationId, e.date, e.theme, e.description, e.wasBusted);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}
	}
}