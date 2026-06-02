using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories.Base;

namespace Antlia.Domain.Interfaces.Repositories
{
    public interface IMovimentoRepository : IRepository
    {
        Task<bool> Add(MovimentoEntity produtoEntity);
    }
}
