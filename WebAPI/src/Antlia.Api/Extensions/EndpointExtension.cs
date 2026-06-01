using Antlia.Api.Abstractions;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Reflection;

namespace Antlia.Api.Extensions
{
    public static class EndpointExtension
    {
        public static IServiceCollection AddEndpoints(this IServiceCollection services, Assembly assembly)
        {
            ServiceDescriptor[] serviceDescriptors = assembly
                .DefinedTypes
                .Where(type => type is { IsAbstract: false, IsInterface: false } &&
                               type.IsAssignableTo(typeof(IEndpoint)))
                .Select(type => ServiceDescriptor.Transient(typeof(IEndpoint), type))
                .ToArray();

            services.TryAddEnumerable(serviceDescriptors);

            return services;
        }

        public static IApplicationBuilder MapEndpoints(this WebApplication app, RouteGroupBuilder? routeGroupBuilder = null)
        {
            IEnumerable<IEndpoint> services = app.Services.GetRequiredService<IEnumerable<IEndpoint>>();

            IEndpointRouteBuilder endpoint = routeGroupBuilder is null ? app : routeGroupBuilder;

            foreach (IEndpoint service in services)
            {
                service.MapEndpoint(app, endpoint);
            }

            return app;
        }
    }
}
