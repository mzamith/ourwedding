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

            CreateMappingsForDisplay();
            CreateMappingsForUpdate();

        }

        private void CreateMappingsForDisplay()
        {
            CreateMap<Invite, InviteDetailsDto>()
                .ForMember(dest => dest.InviteAnswer, opt => opt.MapFrom(src => src.InviteAnswers.FirstOrDefault(ia => ia.Status == "V")));

            CreateMap<Invitee, InviteeDto>()
                .ForMember(dest => dest.InviteeAnswer, opt => opt.MapFrom(src => src.InviteeAnswers.FirstOrDefault(ia => ia.Status == "V")));

            CreateMap<InviteeAnswer, InviteeAnswerDto>();
            CreateMap<InviteAnswer, InviteAnswerDto>();
        }

        private void CreateMappingsForUpdate()
        {
            CreateMap<InviteAnswerUpdateDto, InviteAnswer>()
                .ForMember(dest => dest.AnswerDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => "V"));

            CreateMap<InviteeAnswerUpdateDto, InviteeAnswer>()
                .ForMember(dest => dest.AnswerDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => "V"));

            CreateMap<InviteeUpdateDto, Invitee>()
                .AfterMap((src, dest, context) =>
                {
                    dest.InviteeAnswers = new List<InviteeAnswer>();
                    dest.InviteeAnswers.Add(context.Mapper.Map<InviteeAnswer>(src.InviteeAnswer));
                });

            CreateMap<InviteUpdateDto, Invite>()
                .AfterMap((src, dest, context) =>
                {
                    if (src.InviteAnswer != null)
                    {
                        if (!dest.InviteAnswers.IsAny())
                            dest.InviteAnswers = new List<InviteAnswer>();

                        dest.InviteAnswers.SetStatus("H");
                        var newInviteAnswer = context.Mapper.Map<InviteAnswer>(src.InviteAnswer);
                        dest.InviteAnswers.Add(newInviteAnswer);
                    }

                    if (src.Invitees.IsAny())
                    {
                        foreach (var invitee in src.Invitees)
                        {
                            if (invitee.isNew)
                            {
                                var newInvitee = context.Mapper.Map<Invitee>(invitee);
                                dest.Invitees.Add(newInvitee);
                            }
                            else
                            {
                                var inviteeFromRepo = dest.Invitees.FirstOrDefault(i => i.Id == invitee.Id);
                                if (!inviteeFromRepo.InviteeAnswers.IsAny())
                                    inviteeFromRepo.InviteeAnswers = new List<InviteeAnswer>();
                                inviteeFromRepo.InviteeAnswers.SetStatus("H");

                                var newInviteeAnswer = context.Mapper.Map<InviteeAnswer>(invitee.InviteeAnswer);
                                inviteeFromRepo.InviteeAnswers.Add(newInviteeAnswer);
                            }
                        }
                    }
                });
        }
    }
}