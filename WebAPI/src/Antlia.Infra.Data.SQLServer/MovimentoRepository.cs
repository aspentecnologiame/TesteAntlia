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
        public async Task<bool> Add(MovimentoEntity produtoEntity)
        {
            using var connection = await DatabaseConnection();

            var parameters = new 
            { 
                DAT_MES = produtoEntity.Mes,
                DAT_ANO = produtoEntity.Ano,
                NUM_LANCAMENTO = produtoEntity.Lancamento,
                COD_PRODUTO = produtoEntity.CodigoProduto,
                COD_COSIF = produtoEntity.CodigoCosif,
                DES_DESCRICAO = produtoEntity.Descricao,
                DAT_MOVIMENTO = produtoEntity.DataMovimento,
                COD_USUARIO = produtoEntity.CodigoUsuario,
                VAL_VALOR = produtoEntity.Valor
            };

            var inserted = await connection.ExecuteScalarAsync<int>("usp_InserirMovimento", parameters, commandType: CommandType.StoredProcedure);

            return inserted > 0;
        }
    }
}
