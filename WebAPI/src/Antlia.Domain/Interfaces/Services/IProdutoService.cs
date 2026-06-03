using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Services.Base;

namespace Antlia.Domain.Interfaces.Services
{
    public interface IProdutoService : IService
    {
        Task<IEnumerable<ProdutoEntity>> ListaProdutos();
    }
}
