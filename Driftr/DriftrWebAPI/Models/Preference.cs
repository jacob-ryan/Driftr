using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Models
{
	public class Preference
	{
		public int id { get; set; }
		public string userEmail { get; set; }
		public int rating { get; set; }
		public string type { get; set; }
		public string key { get; set; }
		public string value { get; set; }
	}
}