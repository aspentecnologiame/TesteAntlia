using Antlia.Domain.Enums;

namespace Antlia.Domain.Entities
{
    public class ProdutoCosifEntity
    {
        public string CodigoProduto { get; set; } = string.Empty;
        public string CodigoCosif { get; set; } = string.Empty;
        public string CodigoClassificacao { get; set; } = string.Empty;
        public StatusEnum Status { get; set; }
    }
}
