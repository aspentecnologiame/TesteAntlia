using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Antlia.Domain.Entities
{
    public class MovimentosManuaisEntity
    {
        public int Mes { get; set; }
        public int Ano { get; set; }
        public int Lancamento { get; set; }
        public string CodigoProduto { get; set; } = string.Empty;
        public string DescricaoProduto { get; set; } = string.Empty;
        public string DescricaoMovimento { get; set; } = string.Empty;
        public decimal Valor { get; set; }
    }
}
