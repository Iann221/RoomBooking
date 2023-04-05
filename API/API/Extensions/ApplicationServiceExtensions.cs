using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.Core;
using API.Application.Rooms;
using Application.Interfaces;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) // cek lecture 40 ttg this
        {
            // 2 ini udah bawaan
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            
            // agar bisa pake Datacontext
            services.AddDbContext<DataContext>(opt =>
            {
                // klo pake sqlie:
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler)); // registers mediator as a service. typeof mksdnya kita specify lokasi handlernya
            services.AddAutoMapper(typeof(MappingProfiles).Assembly); // registers mapper as a service
            services.AddHttpContextAccessor(); // agar httpcontextaccessor bisa dipake di infrastructure project
            services.AddScoped<IUserAccessor, UserAccessor>(); // bisa make methodnya infrastructure

            return services;
        }

    }
}