using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories.Base;

namespace Antlia.Domain.Interfaces.Repositories
{
    public interface IProdutoCosifRepository : IRepository
    {
        Task<IEnumerable<ProdutoCosifEntity>> ConsultaProdutoCosif(string codigoProduto);
    }
}
