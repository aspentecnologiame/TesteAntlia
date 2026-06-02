namespace Antlia.Api.Models.Request
{
    public record ProdutoCosifRequest(string CodigoProduto) : BaseRequest<string>(CodigoProduto);
}
