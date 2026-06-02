using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Antlia.Infra.Data.SQLServer.Base
{
    public abstract class BaseRepository(IConfiguration configuration)
    {
        private readonly IConfiguration _configuration = configuration;

        public async Task<IDbConnection> DatabaseConnection()
        {
            var connection = new SqlConnection(_configuration.GetConnectionString("Antlia"));
            await connection.OpenAsync();

            return connection;
        }
    }
}
