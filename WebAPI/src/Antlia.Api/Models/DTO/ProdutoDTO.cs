using Antlia.Domain.Enums;

namespace Antlia.Api.Models.DTO
{
    public record ProdutoDTO(string Codigo, string Descricao, StatusEnum Status);
}
