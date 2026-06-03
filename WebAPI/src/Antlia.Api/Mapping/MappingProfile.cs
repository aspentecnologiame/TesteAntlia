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
            CreateMap<ProdutoDTO, ProdutoEntity>();
        }

        private void CreateMappingResponse()
        {
            CreateMap<MovimentoEntity, MovimentoDTO>();
            CreateMap<ProdutoEntity, ProdutoDTO>();
            CreateMap<ProdutoCosifEntity, ProdutoCosifDTO>();
            CreateMap<MovimentosManuaisEntity, MovimentosManuaisDTO>();
        }
    }
}
