using Antlia.Api.Abstractions;
using Antlia.Api.Models.DTO;
using Antlia.Api.Models.Request;
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

            app.MapPost("/movimento", async (BaseRequest<MovimentoDTO> movimento, IMovimentoService _movimentoService, IMapper _mapper) =>
            {
                try
                {
                    var movimentoEntity = _mapper.Map<MovimentoEntity>(movimento.Data);
                    var result = await _movimentoService.Add(movimentoEntity);
                    return await Task.FromResult(Results.Created($"/{route}/{movimento.Data.CodigoProduto}", movimento));
                }
                catch (Exception ex)
                {
                    return await Task.FromResult(Results.Problem(ex.Message));
                }
            });
        }
    }
}
