using Antlia.Domain.Enums;

namespace Antlia.Api.Models.DTO
{
    public record MovimentoDTO(int Mes, int Ano, int Lancamento, string CodigoProduto, string CodigoCosif, string Descricao, DateTime DataMovimento, string CodigoUsuario, decimal Valor);
}
