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
            CreateMap<ProdutoDTO, ProdutoEntity>();
        }

        private void CreateMappingResponse()
        {
            CreateMap<ProdutoEntity, ProdutoDTO>();
        }
    }
}
