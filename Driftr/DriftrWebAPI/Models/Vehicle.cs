using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DriftrWebAPI.Models
{
	public class Vehicle
	{
		public int id { get; set; }
		public string userEmail { get; set; }
		public string make { get; set; }
		public string model { get; set; }
		public int year { get; set; }
		public string color { get; set; }
		public string description { get; set; }
	}
}