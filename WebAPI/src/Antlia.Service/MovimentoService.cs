using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories;
using Antlia.Domain.Interfaces.Services;

namespace Antlia.Service
{
    public class MovimentoService(IMovimentoRepository movimentoRepository) : IMovimentoService
    {
        private readonly IMovimentoRepository _movimentoRepository = movimentoRepository;
        private readonly string _codigoUsuario = "dev01";

        public async Task<bool> Add(MovimentoEntity movimentoEntity)
        {
            var ultimoMovimento = await _movimentoRepository.ConsultaUltimoMovimento(movimentoEntity.Ano, movimentoEntity.Mes);
            var lancamento = ultimoMovimento ?? default;

            movimentoEntity.CodigoUsuario = _codigoUsuario;
            movimentoEntity.DataMovimento = DateTime.Now;
            movimentoEntity.Lancamento =  lancamento + 1;
            return await _movimentoRepository.Add(movimentoEntity);
        }

        public async Task<IEnumerable<MovimentosManuaisEntity>> ListarMovimentos() => await _movimentoRepository.ListarMovimentos();
    }
}
