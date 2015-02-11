using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Models
{
	public class EventParticipant
	{
		public string userEmail { get; set; }
		public int eventId { get; set; }
		public int? placement { get; set; }
	}
}