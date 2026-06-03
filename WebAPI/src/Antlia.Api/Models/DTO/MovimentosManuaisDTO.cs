namespace Antlia.Api.Models.DTO
{
    public record MovimentosManuaisDTO(string CodigoProduto, string DescricaoProduto, int Mes, int Ano, int Lancamento, decimal Valor, string DescricaoMovimento);
}
