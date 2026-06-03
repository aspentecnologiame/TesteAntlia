using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories.Base;

namespace Antlia.Domain.Interfaces.Repositories
{
    public interface IProdutoRepository : IRepository
    {
        Task<IEnumerable<ProdutoEntity>> ListaProdutos();
    }
}