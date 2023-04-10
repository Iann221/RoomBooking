using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.API.DTO;
using API.Domain;
using AutoMapper;

namespace API.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Room, RoomDto>();
            CreateMap<Reservation, ReservationDto>()
            .ForMember(d => d.DateTime, o => o.MapFrom(s => s.ReserveTime))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Reservee))
            .ForMember(d => d.Purpose, o => o.MapFrom(s => s.Purpose));
        }
    }
}