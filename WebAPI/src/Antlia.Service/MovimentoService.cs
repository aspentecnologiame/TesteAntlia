using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Services;

namespace Antlia.Service
{
    public class MovimentoService : IMovimentoService
    {
        public async Task<bool> Add(ProdutoEntity produtoEntity)
        {
            // Lógica para adicionar um produto
            return await Task.FromResult(true);
        }
    }
}
