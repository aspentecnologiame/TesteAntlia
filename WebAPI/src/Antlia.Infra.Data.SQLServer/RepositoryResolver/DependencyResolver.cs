using Antlia.Domain.Interfaces.Repositories.Base;
using Microsoft.Extensions.DependencyInjection;

namespace Antlia.Infra.Data.SQLServer.RepositoryResolver
{
    public static class DependencyResolver
    {
        public static IServiceCollection RegisterSQLRepositoriesDependencies(this IServiceCollection services)
        {
            typeof(DependencyResolver).Assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract && typeof(IRepository).IsAssignableFrom(t))
                .ToList()
                .ForEach(t =>
                    t.GetInterfaces()
                        .Where(i => typeof(IRepository).IsAssignableFrom(i))
                        .ToList()
                        .ForEach(i => services.AddSingleton(i, t))
                );

            return services;
        }
    }
}
