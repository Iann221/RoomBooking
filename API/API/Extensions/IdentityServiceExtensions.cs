using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.API.Services;
using API.Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityService(this IServiceCollection services, IConfiguration config) // cek lecture 40 ttg this
        {
            services.AddIdentityCore<AppUser>(opt =>{ // berisi rule2 dari identity
                opt.Password.RequireNonAlphanumeric = false; // passwordnya g perlu ada simbol2 aneh
                opt.Password.RequireLowercase = false;
                opt.Password.RequireUppercase = false;
                opt.User.RequireUniqueEmail = true; // di db harus unik emailnya
            })
            .AddEntityFrameworkStores<DataContext>(); // allows us to query our user in entity framework store (db kita)
        
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])); 
            //make sure use same key saat bikin token agar api bisa decrypt
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters // specify apa aja yg mw divalidate
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddScoped<TokenService>(); // when http request comes in, go to account controller and request token
            
            return services;
        }
    }
}