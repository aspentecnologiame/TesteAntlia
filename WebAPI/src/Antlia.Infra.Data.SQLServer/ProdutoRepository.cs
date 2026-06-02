using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories;
using Antlia.Infra.Data.SQLServer.Base;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Antlia.Infra.Data.SQLServer
{
    public class ProdutoRepository(IConfiguration configuration) : BaseRepository(configuration), IProdutoRepository
    {
        public async Task<IEnumerable<ProdutoEntity>> ConsultaProdutos()
        {
            using var connection = await DatabaseConnection();

            var produtos = await connection.QueryAsync<ProdutoEntity>("usp_ConsultaProdutos", commandType: CommandType.StoredProcedure);

            return produtos;
        }
    }
}