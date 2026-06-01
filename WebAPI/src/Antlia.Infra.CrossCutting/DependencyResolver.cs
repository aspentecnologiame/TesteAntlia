using Antlia.Service.ServiceResolver;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Antlia.Infra.CrossCutting
{
    public static class DependencyResolver
    {
        public static IServiceCollection RegisterCrossCuttingDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.RegisterServicesDependencies();

            return services;
        }
    }
}
