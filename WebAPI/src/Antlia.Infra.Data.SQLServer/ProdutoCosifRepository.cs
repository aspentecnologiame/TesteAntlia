using Antlia.Domain.Entities;
using Antlia.Domain.Interfaces.Repositories;
using Antlia.Infra.Data.SQLServer.Base;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Antlia.Infra.Data.SQLServer
{
    public class ProdutoCosifRepository(IConfiguration configuration) : BaseRepository(configuration), IProdutoCosifRepository
    {
        public async Task<IEnumerable<ProdutoCosifEntity>> ConsultaProdutoCosif(string codigoProduto)
        {
            using var connection = await DatabaseConnection();

            var parameters = new { COD_PRODUTO = codigoProduto };

            var produtos = await connection.QueryAsync<ProdutoCosifEntity>("usp_ConsultaProdutosCosif", parameters, commandType: CommandType.StoredProcedure);

            return produtos;
        }
    }
}
