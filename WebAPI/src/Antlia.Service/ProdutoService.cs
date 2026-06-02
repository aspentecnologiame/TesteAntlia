using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories;
using Antlia.Domain.Interfaces.Services;

namespace Antlia.Service
{
    public class ProdutoService(IProdutoRepository produtoRepository) : IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository = produtoRepository;

        public async Task<IEnumerable<ProdutoEntity>> ConsultaProdutos() => await _produtoRepository.ConsultaProdutos();
    }
}
