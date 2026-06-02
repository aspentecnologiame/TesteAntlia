using Antlia.Api.Abstractions;
using Antlia.Api.Models.DTO;
using Antlia.Api.Models.Response;
using Antlia.Domain.Interfaces.Repositories;
using Antlia.Domain.Interfaces.Services;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace Antlia.Api.Endpoints
{
    public class ProdutoEndpoint : IEndpoint
    {
        public void MapEndpoint(IApplicationBuilder builder, IEndpointRouteBuilder app)
        {
            app.MapGet("/produto", async (IProdutoService _produtoService, IMapper _mapper) =>
            {
                var produtosEntity = await _produtoService.ConsultaProdutos();
                var produtosDTO = _mapper.Map<IEnumerable<ProdutoDTO>>(produtosEntity);

                return Results.Ok(new BaseResponse<IEnumerable<ProdutoDTO>>(produtosDTO));
            })
            .WithName("GetProduto")
            .WithOpenApi();
        }
    }
}