using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DriftrWebAPI.Helpers;
using DriftrWebAPI.Models;
using DriftrWebAPI.Sprocs;

namespace DriftrWebAPI.Controllers
{
	public class VehiclesAllowedController : BaseController
	{
		// GET: api/VehiclesAllowed/<eventId>?email=abc@xyz.com
		[Authorize]
		public int Get(int id, string email)
		{
			SqlDataReader reader = SprocVehiclesAllowed.get(this.connection, email, id);
			reader.Read();
			return (int) reader["count"];
		}
	}
}