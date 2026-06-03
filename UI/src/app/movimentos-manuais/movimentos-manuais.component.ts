import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MovimentoModel } from './models/movimentos.model';
import { MovimentoManualModel } from './models/movimento-manual.model';
import { MovimentosManuaisService } from './movimentos-manuais.service';
import { ProdutoModel } from './models/produto.model';
import { ProdutoCosifModel } from './models/produto-cosif.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'app-movimentos-manuais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [CurrencyPipe],
  templateUrl: './movimentos-manuais.component.html',
  styleUrls: ['./movimentos-manuais.component.scss']
})
export class MovimentosManuaisComponent {
  
  produtos = [] as ProdutoModel[];
  produtosCosif = [] as ProdutoCosifModel[];

  movimentoManual = {} as MovimentoManualModel;
  private movimentosSubject = new BehaviorSubject<MovimentoModel[]>([]);
  movimentos$: Observable<MovimentoModel[]> = this.movimentosSubject.asObservable();
  movimentos: MovimentoModel[] = [];
  
  form = this.fb.group({
    mes: [{ value: '', disabled: true }],
    ano: [{ value: '', disabled: true }],
    produto: [{ value: '', disabled: true }],
    cosif: [{ value: '', disabled: true }],
    valor: [{ value: '', disabled: true }],
    descricao: [{ value: '', disabled: true }]
  });

  constructor(
    private fb: FormBuilder,
    private movimentoService: MovimentosManuaisService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {

    this.movimentoService.listarProdutos().subscribe((response) => {
      this.produtos = response.data.map((item) => ({
        codigo: item.codigo,
        descricao: item.descricao,
        status: item.status
      }));
      console.log('Produtos carregados:', this.produtos);
    });

    this.movimentoService.listarMovimentos()
      .pipe(
        map((response) => response.data.map((item, index) => ({
          ano: item.ano,
          mes: item.mes,
          codigoProduto: item.codigoProduto,
          descricaoProduto: item.descricaoProduto,
          lancamento: item.lancamento,
          descricaoMovimento: item.descricaoMovimento,
          valor: this.currencyPipe.transform(item.valor, 'BRL', 'symbol', '1.2-2') || ''
        } as MovimentoModel)))
      )
      .subscribe((mapped) => {
        this.movimentos = mapped;
        this.movimentosSubject.next(mapped);
        console.log('Movimentos carregados:', mapped);
      });

  }

  limpar(): void {
    this.form.reset();
  }

  novo(): void {
    this.form.enable();
    this.form.controls['cosif'].disable();
    this.form.reset();
    this.form.patchValue({
      mes: '',
      ano: '',
      produto: '',
      cosif: '',
      valor: '',
      descricao: ''
    });
  }

  onMesInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let cleaned = input.value.replace(/\D/g, '').slice(0, 2);
    
    // Valida se o mês é maior que 12
    const mesValue = Number(cleaned);
    if (mesValue > 12) {
      cleaned = '12';
    }
    
    input.value = cleaned;
    this.form.get('mes')?.setValue(cleaned, { emitEvent: false });
  }

  onAnoInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 4);
    this.form.get('ano')?.setValue(input.value, { emitEvent: false });
  }

  onValorInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/[^0-9,\.]/g, '').replace(/\./g, '').replace(/,/g, '.');
    this.form.get('valor')?.setValue(raw, { emitEvent: false });
  }

  formatCurrencyValue(value: string) {
    if (!value) return;

    // Remove tudo que não é dígito
    const numeroLimpo = value.replace(/\D/g, '');
    
    // Converte para um valor decimal (ex: divide por 100 para ter os centavos)
    const valorNumerico = Number(numeroLimpo) / 100;

    // Formata usando o CurrencyPipe
    const valorFormatado = this.currencyPipe.transform(valorNumerico, 'BRL', 'symbol', '1.2-2');

    // Atualiza o formulário sem disparar o evento novamente (evita loop)
    this.form.get('valor')?.patchValue(valorFormatado, { emitEvent: false });
  }

  onProdutoClick(): void {
    const produtoSelecionado = this.form.get('produto')?.value || undefined;
    if (produtoSelecionado) {
      this.movimentoService.listarProdutosCosif(produtoSelecionado).subscribe((response) => {
      this.produtosCosif = response.data.map((item) => ({
        codigoProduto: item.codigoProduto,
        codigoCosif: item.codigoCosif,
        codigoClassificacao: item.codigoClassificacao,
        status: item.status
      }));
      this.form.controls['cosif'].enable();
      console.log('Produtos Cosif carregados:', this.produtosCosif);
    });
    }
    
  }

  incluir(): void {

    const value = this.form.value;
    const produto = this.produtos.find((item) => item.codigo === value.produto);
    const descricao = value.descricao?.trim() || 'Movimento novo';
    const valor = value.valor ? this.formatValor(value.valor) : this.formatValor('R$ 0,00');
    let skip = false;

    this.movimentoManual = {
      mes: value.mes || '',
      ano: value.ano || '',
      codigoProduto: produto?.codigo || '',
      codigoCosif: value.cosif || '',
      descricao,
      valor
    };

    Object.entries(this.movimentoManual).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        skip = true;
      }
    });
    
    if (skip) {
      console.log('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const teste = this.movimentoService.save(this.movimentoManual).subscribe({
            next: (response) => {

              this.movimentoService.listarMovimentos()
              .pipe(
                map((response) => response.data.map((item, index) => ({
                  ano: item.ano,
                  mes: item.mes,
                  codigoProduto: item.codigoProduto,
                  descricaoProduto: item.descricaoProduto,
                  lancamento: item.lancamento,
                  descricaoMovimento: item.descricaoMovimento,
                  valor: this.currencyPipe.transform(item.valor, 'BRL', 'symbol', '1.2-2') || ''
                } as MovimentoModel)))
              )
              .subscribe((mapped) => {
                this.movimentos = mapped;
                this.movimentosSubject.next(mapped);
                console.log('Movimentos carregados:', mapped);
              });

              console.log('Movimento salvo com sucesso:', response.data);
              this.form.reset();
              this.form.disable();
            },
            error: (err) => {
              console.log(err);
            }
    });

  }

  private formatValor(value: string): number {
    const numeric = Number(value.replace(/[^\d,\.-]/g, '').replace(',', '.'));
    if (Number.isNaN(numeric)) {
      return 0;
    }
    return numeric;
  }
}
