using Antlia.Domain.Enums;

namespace Antlia.Api.Models.DTO
{
    public record ProdutoCosifDTO(string CodigoProduto, string CodigoCosif, string CodigoClassificacao, StatusEnum Status);
}
