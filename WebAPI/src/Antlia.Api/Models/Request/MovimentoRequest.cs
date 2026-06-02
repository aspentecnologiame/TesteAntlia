using Antlia.Api.Models.DTO;

namespace Antlia.Api.Models.Request
{
    public record MovimentoRequest(MovimentoDTO data) : BaseRequest<MovimentoDTO>(data);
}
