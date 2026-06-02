import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Movimento } from './models/Movimento';


@Component({
  selector: 'app-movimentos-manuais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movimentos-manuais.component.html',
  styleUrls: ['./movimentos-manuais.component.scss']
})
export class MovimentosManuaisComponent {
  form = this.fb.group({
    mes: [''],
    ano: [''],
    produto: [''],
    cosif: [''],
    valor: [''],
    descricao: ['']
  });

  produtos = [
    { id: '1', name: 'Produto Teste' },
    { id: '2', name: 'Produto Teste 2' }
  ];

  cosifs = [
    { id: '3001', name: 'Cosif 3001' },
    { id: '3002', name: 'Cosif 3002' }
  ];

  movimentos: Movimento[] = [
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

  constructor(private fb: FormBuilder) {}

  limpar(): void {
    this.form.reset();
  }

  novo(): void {
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

  incluir(): void {
    const value = this.form.value;
    const produto = this.produtos.find((item) => item.name === value.produto);
    const descricao = value.descricao?.trim() || 'Movimento novo';
    const valor = value.valor ? this.formatValor(value.valor) : 'R$ 0,00';

    this.movimentos = [
      ...this.movimentos,
      {
        mes: value.mes || '',
        ano: value.ano || '',
        produtoCodigo: produto?.id || '',
        produtoDescricao: value.produto || '',
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
