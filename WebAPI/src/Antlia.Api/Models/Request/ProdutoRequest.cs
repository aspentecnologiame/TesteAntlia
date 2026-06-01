using Antlia.Api.Models.DTO;

namespace Antlia.Api.Models.Request
{
    public record ProdutoRequest(ProdutoDTO data) : BaseRequest<ProdutoDTO>(data);
}
