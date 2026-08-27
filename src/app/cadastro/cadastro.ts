import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../clienteService';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brasilapi } from '../brasilapi';
import { Estado, Municipio } from '../brasilapi.module';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


@Component({
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, NgxMaskDirective, MatSelectModule, CommonModule],
  providers: [provideNgxMask()],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class CadastroComponent {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router : Router, private brasilapi: Brasilapi) {

  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clienteEncontrado = this.clienteService.pesquisarClientePorId(id);
        if (clienteEncontrado) {
          this.cliente = clienteEncontrado;
          this.atualizando = true;
          if(this.cliente.uf) {
            const event = { value: this.cliente.uf }
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
      }
    })
    this.carregarUfs();
  }

  cadastrarCliente() {
    if (!this.atualizando) {
      this.clienteService.cadastrarCliente(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem('Cliente cadastrado com sucesso!');
    } else {
      this.clienteService.atualizarCliente(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Cliente salvo com sucesso!');
    }
  }
  limpar() {
    this.cliente = Cliente.newCliente();
    this.mostrarMensagem('Limpo com sucesso!');
    this.municipios = [];
  }
  carregarUfs() {
    this.brasilapi.listarUFs().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (error) => {
        console.error('Erro ao carregar UFs:', error);
      }
    })
  }

  carregarMunicipios(event: MatSelectChange) {
    const uf = event.value;
    this.brasilapi.listarMunicipios(uf).subscribe({
      next: (municipios) => {
        this.municipios = municipios;
      },
      error: (error) => {
        console.error('Erro ao carregar municípios:', error);
      }
    });
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'Fechar', {
      duration: 3000,
    });
  }
}
