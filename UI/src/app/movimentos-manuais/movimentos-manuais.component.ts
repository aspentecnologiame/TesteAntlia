import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MovimentoModel } from './models/movimentos.model';
import { MovimentoManualModel } from './models/movimento-manual.model';
import { MovimentosManuaisService } from './movimentos-manuais.service';
import { ProdutoModel } from './models/produto.model';
import { ProdutoCosifModel } from './models/produto-cosif.model';

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
  movimentoManual = [] as MovimentoManualModel[];
  
  form = this.fb.group({
    mes: [{ value: '', disabled: true }],
    ano: [{ value: '', disabled: true }],
    produto: [{ value: '', disabled: true }],
    cosif: [{ value: '', disabled: true }],
    valor: [{ value: '', disabled: true }],
    descricao: [{ value: '', disabled: true }]
  });

  movimentos: MovimentoModel[] = [
    {
      mes: '2',
      ano: '2012',
      produtoCodigo: '1',
      produtoDescricao: 'Produto Teste',
      lancamento: 1,
      descricao: 'Teste Movimentos',
      valor: 'R$ 500,00'
    },
    {
      mes: '2',
      ano: '2012',
      produtoCodigo: '2',
      produtoDescricao: 'Produto Teste 2',
      lancamento: 2,
      descricao: 'Teste Movimentos 2',
      valor: 'R$ 10,00'
    },
    {
      mes: '2',
      ano: '2012',
      produtoCodigo: '1',
      produtoDescricao: 'Produto Teste',
      lancamento: 3,
      descricao: 'Teste Movimentos 2',
      valor: 'R$ 12,00'
    },
    {
      mes: '2',
      ano: '2012',
      produtoCodigo: '1',
      produtoDescricao: 'Produto Teste',
      lancamento: 4,
      descricao: 'Teste Movimentos 4',
      valor: 'R$ 100,00'
    }
  ];

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
  }

  limpar(): void {
    this.form.reset();
  }

  novo(): void {
    this.form.enable();
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
    input.value = input.value.replace(/\D/g, '').slice(0, 2);
    this.form.get('mes')?.setValue(input.value, { emitEvent: false });
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
      console.log('Produtos Cosif carregados:', this.produtosCosif);
    });
    }
    
  }

  incluir(): void {
    debugger;
    const value = this.form.value;
    const produto = this.produtos.find((item) => item.codigo === value.produto);
    const descricao = value.descricao?.trim() || 'Movimento novo';
    const valor = value.valor ? this.formatValor(value.valor) : 'R$ 0,00';

    this.movimentos = [
      ...this.movimentos,
      {
        mes: value.mes || '',
        ano: value.ano || '',
        produtoCodigo: produto?.codigo || '',
        produtoDescricao: produto?.descricao || '',
        lancamento: this.movimentos.length + 1,
        descricao,
        valor
      }
    ];

    this.form.reset();
  }

  private formatValor(value: string): string {
    const numeric = Number(value.toString().replace(',', '.').replace(/[^[0-9].]/g, ''));
    if (Number.isNaN(numeric)) {
      return 'R$ 0,00';
    }
    return `R$ ${numeric.toFixed(2).replace('.', ',')}`;
  }
}
