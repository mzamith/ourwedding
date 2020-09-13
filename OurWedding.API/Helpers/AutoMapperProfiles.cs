using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using OurWedding.API.Dtos;
using OurWedding.API.Models;

namespace OurWedding.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Invite, InviteHomeDto>()
                .ForMember(dest => dest.Answered, opt =>
                    opt.MapFrom(src => src.InviteAnswers.IsAny()))
                .ForMember(dest => dest.LastAnswered, opt =>
                    opt.MapFrom(src => src.InviteAnswers
                        .OrderByDescending(i => i.AnswerDate).FirstOrDefault().AnswerDate));

            CreateMap<RecommendationDto, Recommendation>();
            CreateMap<Invite, AccessesDto>()
                .ForMember(dest => dest.IsAdmin, opt => opt.MapFrom(src => src.UserRoles.Select(ur => ur.Role.Name).Contains("Admin")));

            CreateMappingsForDisplay();
            CreateMappingsForUpdate();


        }

        private void CreateMappingsForDisplay()
        {

            //User Display
            CreateMap<Invite, InviteDetailsDto>()
                .ForMember(dest => dest.InviteAnswer, opt => opt.MapFrom(src => src.InviteAnswers.FirstOrDefault(ia => ia.Status != "H")));

            CreateMap<Invitee, InviteeDto>()
                .ForMember(dest => dest.InviteeAnswer, opt => opt.MapFrom(src => src.InviteeAnswers.FirstOrDefault(ia => ia.Status != "H")));

            CreateMap<InviteeAnswer, InviteeAnswerDto>();
            CreateMap<InviteAnswer, InviteAnswerDto>();

            //Admin Display
            CreateMap<Invitee, InviteeMultipleDto>();
            CreateMap<Invite, InviteDetailsMultipleDto>();
        }

        private void CreateMappingsForUpdate()
        {
            CreateMap<InviteAnswerUpdateDto, InviteAnswer>()
                .ForMember(dest => dest.AnswerDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => "V"));

            CreateMap<InviteeAnswerUpdateDto, InviteeAnswer>()
                .ForMember(dest => dest.AnswerDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => "V"));

            CreateMap<InviteeUpdateDto, Invitee>();

            CreateMap<InviteUpdateDto, Invite>();
        }
    }

}