using Antlia.Api.Abstractions;
using Antlia.Api.Models.DTO;
using Antlia.Api.Models.Response;
using Antlia.Domain.Interfaces.Services;
using AutoMapper;

namespace Antlia.Api.Endpoints
{
    public class ProdutoCosifEndpoint : IEndpoint
    {
        public void MapEndpoint(IApplicationBuilder builder, IEndpointRouteBuilder app)
        {
            app.MapGet("/produto-cosif/{codigoProduto}", async (string codigoProduto, IProdutoCosifService _produtoCosifService, IMapper _mapper) =>
            {
                var produtosCosifEntity = await _produtoCosifService.ConsultaProdutoCosif(codigoProduto);
                var produtosCosifDTO = _mapper.Map<IEnumerable<ProdutoCosifDTO>>(produtosCosifEntity);  
                return Results.Ok(new BaseResponse<IEnumerable<ProdutoCosifDTO>>(produtosCosifDTO));
            })
            .WithName("GetProdutoCosif")
            .WithOpenApi();
        }
    }
}
