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
            .ForMember(d => d.EndDateTime, o => o.MapFrom(s => s.EndReserveTime))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Reservee))
            .ForMember(d => d.PhoneNumber, o => o.MapFrom(s => s.PhoneNumber))
            .ForMember(d => d.Purpose, o => o.MapFrom(s => s.Purpose))
            .ForMember(d => d.RoomId, o => o.MapFrom(s => s.Room.Id))
            .ForMember(d => d.RoomName, o => o.MapFrom(s => s.Room.Title))
            .ForMember(d => d.Email, o => o.MapFrom(s => s.Email));
            CreateMap<AppUser, UserInfoDto>();
        }
    }
}