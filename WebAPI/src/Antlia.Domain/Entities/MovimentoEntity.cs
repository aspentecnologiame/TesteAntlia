using Antlia.Domain.Enums;

namespace Antlia.Domain.Entities
{
    public class MovimentoEntity
    {
        public int Mes { get; set; }
        public int Ano { get; set; }
        public int Lancamento { get; set; }
        public string CodigoProduto { get; set; } = string.Empty;
        public string CodigoCosif { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataMovimento { get; set; }
        public string CodigoUsuario { get; set; } = string.Empty;
        public decimal Valor { get; set; }
    }
}
