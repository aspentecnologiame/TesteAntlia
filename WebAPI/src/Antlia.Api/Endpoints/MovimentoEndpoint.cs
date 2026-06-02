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
            const string route = "";

            app.MapPost("/movimento", async (MovimentoDTO movimento, IMovimentoService _movimentoService, IMapper _mapper) =>
            {
                try
                {
                    var movimentoEntity = _mapper.Map<MovimentoEntity>(movimento);
                    var result = await _movimentoService.Add(movimentoEntity);
                    return await Task.FromResult(Results.Created($"/{route}/{movimento.CodigoProduto}", movimento));
                }
                catch (Exception ex)
                {
                    return await Task.FromResult(Results.Problem(ex.Message));
                }
            });
        }
    }
}
