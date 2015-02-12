using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DriftrWebAPI.Controllers;

namespace DriftrWebAPI.Models
{
	public class CurrentUser
	{
		public static User get()
		{
			using (UserController controller = new UserController())
			{
				return controller.Get(HttpContext.Current.User.Identity.Name.ToString());
			}
		}
	}
}