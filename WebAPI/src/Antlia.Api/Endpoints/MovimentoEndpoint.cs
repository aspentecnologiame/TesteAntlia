using Antlia.Api.Abstractions;
using Antlia.Api.Models.DTO;
using Antlia.Api.Models.Request;
using Antlia.Api.Models.Response;
using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Services;
using AutoMapper;

namespace Antlia.Api.Endpoints
{
    public class MovimentoEndpoint : IEndpoint
    {
        public void MapEndpoint(IApplicationBuilder builder, IEndpointRouteBuilder app)
        {
            app.MapPost("/movimento", async (BaseRequest<MovimentoDTO> movimento, IMovimentoService _movimentoService, IMapper _mapper) =>
            {
                try
                {
                    var movimentoEntity = _mapper.Map<MovimentoEntity>(movimento.Data);
                    var result = await _movimentoService.Add(movimentoEntity);
                    return await Task.FromResult(Results.Created($"/movimento/{movimento.Data.CodigoProduto}", movimento));
                }
                catch (Exception ex)
                {
                    return await Task.FromResult(Results.Problem(ex.Message));
                }
            });

            app.MapGet("/movimento", async (IMovimentoService _movimentoService, IMapper _mapper) =>
            {
                var movimentosEntity = await _movimentoService.ListarMovimentos();
                var movimentosDTO = _mapper.Map<IEnumerable<MovimentosManuaisDTO>>(movimentosEntity);

                return Results.Ok(new BaseResponse<IEnumerable<MovimentosManuaisDTO>>(movimentosDTO));
            })
            .WithName("GetMovimento")
            .WithOpenApi();
        }
    }
}
