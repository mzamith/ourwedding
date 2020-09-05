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

            CreateMap<Invite, InviteDetailsDto>()
                .ForMember(dest => dest.InviteAnswer, opt => opt.MapFrom(src => src.InviteAnswers.FirstOrDefault(ia => ia.Status == "V")));

            CreateMap<Invitee, InviteeDto>()
                .ForMember(dest => dest.InviteeAnswer, opt => opt.MapFrom(src => src.InviteeAnswers.FirstOrDefault(ia => ia.Status == "V")));

            CreateMap<InviteeAnswer, InviteeAnswerDto>();
            CreateMap<InviteAnswer, InviteAnswerDto>();
        }
    }
}