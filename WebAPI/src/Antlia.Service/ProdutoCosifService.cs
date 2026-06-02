using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories;
using Antlia.Domain.Interfaces.Services;

namespace Antlia.Service
{
    public class ProdutoCosifService(IProdutoCosifRepository produtoCosifRepository) : IProdutoCosifService
    {
        private readonly IProdutoCosifRepository _produtoCosifRepository = produtoCosifRepository;

        public async Task<IEnumerable<ProdutoCosifEntity>> ConsultaProdutoCosif(string codigoProduto) => await _produtoCosifRepository.ConsultaProdutoCosif(codigoProduto);
    }
}
