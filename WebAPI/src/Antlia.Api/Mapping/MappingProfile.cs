using Antlia.Api.Models.DTO;
using Antlia.Domain.Entities;
using AutoMapper;

namespace Antlia.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMappingRequest();
            CreateMappingResponse();
        }

        private void CreateMappingRequest()
        {
            CreateMap<MovimentoDTO, MovimentoEntity>();
        }

        private void CreateMappingResponse()
        {
            CreateMap<MovimentoEntity, MovimentoDTO>();
        }
    }
}
