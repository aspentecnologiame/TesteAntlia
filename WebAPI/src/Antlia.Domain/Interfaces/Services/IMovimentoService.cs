using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Services.Base;

namespace Antlia.Domain.Interfaces.Services
{
    public interface IMovimentoService : IService
    {
        Task<bool> Add(MovimentoEntity produtoEntity);
        Task<IEnumerable<MovimentosManuaisEntity>> ListarMovimentos();
    }
}
