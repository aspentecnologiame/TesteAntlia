using Antlia.Api.Abstractions;
using Antlia.Api.Models.DTO;
using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Services;
using AutoMapper;

namespace Antlia.Api.Endpoints
{
    public class MovimentoEndpoint : IEndpoint
    {
        public void MapEndpoint(IApplicationBuilder builder, IEndpointRouteBuilder app)
        {
            const string route = "produto";

            app.MapPost($"/{route}", async (ProdutoDTO produto, IMovimentoService _produtoService, IMapper _mapper) =>
            {
                try
                {
                    var produtoEntity = _mapper.Map<ProdutoEntity>(produto);
                    var result = await _produtoService.Add(produtoEntity);
                    // Lógica para criar um novo produto
                    return await Task.FromResult(Results.Created($"/{route}/{produto.Codigo}", produto));
                }
                catch (Exception ex)
                {
                    // Lógica para lidar com erros
                    return await Task.FromResult(Results.Problem(ex.Message));
                }

            });
        }
    }
}
