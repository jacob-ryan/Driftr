using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DriftrWebAPI.Models;

namespace DriftrWebAPI.Controllers
{
    public class UserController : BaseController
    {
        // GET: api/User
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/User/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        public void Post(User user)
        {
			SqlCommand command = new SqlCommand("EXEC [insert_user] @Email, @Name, @PasswordHash, @PasswordSalt;", this.connection);
			SqlParameter pEmail = new SqlParameter("@Email", user.email);
			SqlParameter pName = new SqlParameter("@Name", user.name);
			SqlParameter pPasswordHash = new SqlParameter("@PasswordHash", SqlDbType.Binary);
			pPasswordHash.Value = new byte[] { 0x0 };
			SqlParameter pPasswordSalt = new SqlParameter("@PasswordSalt", SqlDbType.Binary);
			pPasswordSalt.Value = new byte[] { 0x1 };

			command.Parameters.Add(pEmail);
			command.Parameters.Add(pName);
			command.Parameters.Add(pPasswordHash);
			command.Parameters.Add(pPasswordSalt);
			command.ExecuteReader();
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}