using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Models
{
	public class Preference
	{
		public int eventId { get; set; }
		public string field { get; set; }
		public string entries { get; set; }
		public bool isWhitelist { get; set; }
	}
}