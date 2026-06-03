using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories;
using Antlia.Infra.Data.SQLServer.Base;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Antlia.Infra.Data.SQLServer
{
    public class MovimentoRepository(IConfiguration configuration) : BaseRepository(configuration), IMovimentoRepository
    {
        public async Task<bool> Add(MovimentoEntity movimentoEntity)
        {
            using var connection = await DatabaseConnection();

            var parameters = new 
            { 
                DAT_MES = movimentoEntity.Mes,
                DAT_ANO = movimentoEntity.Ano,
                NUM_LANCAMENTO = movimentoEntity.Lancamento,
                COD_PRODUTO = movimentoEntity.CodigoProduto,
                COD_COSIF = movimentoEntity.CodigoCosif,
                DES_DESCRICAO = movimentoEntity.Descricao,
                DAT_MOVIMENTO = movimentoEntity.DataMovimento,
                COD_USUARIO = movimentoEntity.CodigoUsuario,
                VAL_VALOR = movimentoEntity.Valor
            };

            var inserted = await connection.ExecuteScalarAsync<int>("usp_InserirMovimento", parameters, commandType: CommandType.StoredProcedure);

            return inserted > 0;
        }
    }
}
