using Antlia.Api.Extensions;
using Antlia.Api.Mapping;
using Antlia.Infra.CrossCutting;
using Asp.Versioning;
using AutoMapper;
using Microsoft.Extensions.Logging.Abstractions;

namespace Antlia.Api.AppResolver
{
    public static class DependencyResolver
    {
        public static IServiceCollection RegisterAppDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            // Add services to the container.
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Marcos Roberto da Costa"
                });
            });

            services.AddApiVersioning(options =>
            {
                options.DefaultApiVersion = new ApiVersion(1);
                options.ApiVersionReader = new UrlSegmentApiVersionReader();
            }).AddApiExplorer(options =>
            {
                options.GroupNameFormat = "'v'V";
                options.SubstituteApiVersionInUrl = true;
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(new MappingProfile()), NullLoggerFactory.Instance);
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.RegisterCrossCuttingDependencies(configuration);
            services.AddEndpoints(typeof(Program).Assembly);

            return services;
        }
    }
}
