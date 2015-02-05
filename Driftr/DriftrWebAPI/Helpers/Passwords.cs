using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace DriftrWebAPI.Helpers
{
	public class Passwords
	{
		public static byte[] createSalt(string password)
		{
			using (var deriveBytes = new Rfc2898DeriveBytes(password, 64))
			{
				return deriveBytes.Salt;
			}
		}

		public static byte[] createHash(string password, byte[] salt)
		{
			using (var deriveBytes = new Rfc2898DeriveBytes(password, salt))
			{
				return deriveBytes.GetBytes(64);
			}
		}
	}
}