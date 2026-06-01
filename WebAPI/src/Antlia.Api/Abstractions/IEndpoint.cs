namespace Antlia.Api.Abstractions
{
    public interface IEndpoint
    {
        void MapEndpoint(IApplicationBuilder builder, IEndpointRouteBuilder app);
    }
}
