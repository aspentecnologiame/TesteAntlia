using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Antlia.Domain.Interfaces.Services
{
    public interface IProdutoCosifService : IService
    {
        Task<IEnumerable<ProdutoCosifEntity>> ConsultaProdutoCosif(string codigoProduto);
    }
}
