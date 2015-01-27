using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Models
{
	public class Event
	{
		public int id { get; set; }
		public string userEmail { get; set; }
		public int locationId { get; set; }
		public DateTime date { get; set; }
		public string theme { get; set; }
		public string description { get; set; }
		public bool wasBusted { get; set; }
	}
}