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
	public class VehicleController : BaseController
	{
		// GET: api/Vehicle?email=<email>
		[Authorize]
		public HttpResponseMessage Get(string email)
		{
			SqlDataReader reader = SprocVehicle.get(this.connection, email);
			List<Vehicle> vehicles = new List<Vehicle>();
			while (reader.Read())
			{
				Vehicle vehicle = new Vehicle();
				vehicle.id = (int) reader["id"];
				vehicle.userEmail = reader["userEmail"].ToString();
				vehicle.active = (bool) reader["active"];
				vehicle.make = reader["make"].ToString();
				vehicle.model = reader["model"].ToString();
				vehicle.year = (int) reader["year"];
				vehicle.color = reader["color"].ToString();
				vehicle.description = reader["description"].ToString();

				vehicles.Add(vehicle);
			}
			return Request.CreateResponse(HttpStatusCode.OK, vehicles);
		}

		// POST: api/Vehicle
		public HttpResponseMessage Post(Vehicle vehicle)
		{
			SprocVehicle.add(this.connection, vehicle.userEmail, vehicle.active, vehicle.make, vehicle.model, vehicle.year, vehicle.color, vehicle.description);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}

		// PUT: api/Vehicle/<id>
		public HttpResponseMessage Put(int id, Vehicle vehicle)
		{
			SprocVehicle.update(this.connection, id, vehicle.userEmail, vehicle.active, vehicle.make, vehicle.model, vehicle.year, vehicle.color, vehicle.description);
			return Request.CreateResponse(HttpStatusCode.Created, true);
		}
	}
}