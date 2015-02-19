using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Models
{
	public class Location
	{
		public int id { get; set; }
		public string address { get; set; }
		public string description { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
	}
}