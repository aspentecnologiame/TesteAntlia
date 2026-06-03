import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseRequestModel } from './models/request/base.request.model';
import { BaseResponseModel } from './models/response/base.response.model';
import { ProdutoModel } from './models/produto.model';
import { ProdutoCosifModel } from './models/produto-cosif.model';
import { MovimentoManualModel } from './models/movimento-manual.model';

@Injectable({
  providedIn: 'root'
})

export class MovimentosManuaisService {

  private _navigation: ReplaySubject<any> = new ReplaySubject<any>(1);

  private readonly URLS = {
    baseProduto: "produto",
    baseProdutoCosif: "produto-cosif/",
    baseMovimento: "movimento"
  };

  constructor(private _httpClient: HttpClient) { }

  listarProdutos(): Observable<BaseResponseModel<ProdutoModel[]>>
  {
      return this._httpClient.get<BaseResponseModel<ProdutoModel[]>>(`${environment.urlApi}${environment.apiVersion}${this.URLS.baseProduto}`).pipe(
          tap((navigation) => {
              this._navigation.next(navigation);
          })
      );
  }

  listarProdutosCosif(codigoProduto: string): Observable<BaseResponseModel<ProdutoCosifModel[]>>
  {
      return this._httpClient.get<BaseResponseModel<ProdutoCosifModel[]>>(`${environment.urlApi}${environment.apiVersion}${this.URLS.baseProdutoCosif}${codigoProduto}`).pipe(
          tap((navigation) => {
              this._navigation.next(navigation);
          })
      );
  }

  save(movimentoModel: MovimentoManualModel): Observable<BaseResponseModel<MovimentoManualModel>> {
    return this._httpClient.post<BaseResponseModel<MovimentoManualModel>>(
      `${environment.urlApi}${this.URLS.baseMovimento}`,
      this.baseRequest<MovimentoManualModel>(movimentoModel)
    );
  }

  private baseRequest<T>(parameters: T): BaseRequestModel<T> {
    const base = {} as BaseRequestModel<T>;
    base.data = parameters;
    return base;
  }

  private mapProcessList<T>(event: any): Array<T> {
    if (event.type === HttpEventType.Response) {
      return Object.assign([], event.body);
    }
    return {} as Array<T>;
  }

  private mapProcess<T>(event: any): T {
    if (event.type === HttpEventType.Response) {
      return event.body as T;
    }
    return {} as T;
  }

}
  