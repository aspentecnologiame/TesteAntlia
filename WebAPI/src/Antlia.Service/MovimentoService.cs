using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories;
using Antlia.Domain.Interfaces.Services;

namespace Antlia.Service
{
    public class MovimentoService(IMovimentoRepository movimentoRepository) : IMovimentoService
    {
        private readonly IMovimentoRepository _movimentoRepository = movimentoRepository;

        public async Task<bool> Add(MovimentoEntity produtoEntity)
        {
            return await _movimentoRepository.Add(produtoEntity);
        }
    }
}
