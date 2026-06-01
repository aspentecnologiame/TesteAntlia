using Antlia.Domain.Enums;

namespace Antlia.Domain.Entities
{
    public class ProdutoEntity
    {
        public string Codigo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public StatusEnum Status { get; set; }
    }
}
