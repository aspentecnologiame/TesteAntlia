namespace Antlia.Api.Models.Request
{
    public record BaseRequest<T>(T Data) where T : class;
}
