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
	public class EventParticipantController : BaseController
	{
		// GET: api/EventParticipant/<id>
		[Authorize]
		public HttpResponseMessage Get(int id)
		{
			SqlDataReader reader = SprocEventParticipant.get(this.connection, id);
			List<EventParticipant> participants = new List<EventParticipant>();
			while (reader.Read())
			{
				EventParticipant participant = new EventParticipant();
				participant.eventId = id;
				participant.userEmail = reader["userEmail"].ToString();
				participant.placement = (int?) reader["placement"];

				participants.Add(participant);
			}
			return Request.CreateResponse(HttpStatusCode.OK, participants);
		}

		// POST: api/EventParticipant
		public HttpResponseMessage Post(EventParticipant participant)
		{
			SprocEventParticipant.add(this.connection, participant.userEmail, participant.eventId, participant.placement);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

		// PUT: api/EventParticipant
		public HttpResponseMessage Put(EventParticipant participant)
		{
			SprocEventParticipant.update(this.connection, participant.userEmail, participant.eventId, participant.placement);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

		// DELETE: api/EventParticpant/<id>?email=<email>
		public HttpResponseMessage Delete(int id, string email)
		{
			SprocEventParticipant.delete(this.connection, email, id);
			return Request.CreateResponse(HttpStatusCode.NoContent);
		}
	}
}