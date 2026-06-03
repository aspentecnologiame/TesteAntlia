using Antlia.Domain.Enums;

namespace Antlia.Api.Models.DTO
{
    public record MovimentoDTO(int Mes, int Ano, string CodigoProduto, string CodigoCosif, string Descricao, decimal Valor);
}
