using Antlia.Api.Models.DTO;

namespace Antlia.Api.Models.Request
{
    public record MovimentoRequest(MovimentoDTO Data) : BaseRequest<MovimentoDTO>(Data);
}
