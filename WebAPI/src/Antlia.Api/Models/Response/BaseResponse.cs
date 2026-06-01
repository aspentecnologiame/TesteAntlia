namespace Antlia.Api.Models.Response
{
    public record BaseResponse<T>(List<string> Message, T Data) where T : class
    {
        public BaseResponse(T data) : this(new List<string>(), data)
        {
        }
    }
}
