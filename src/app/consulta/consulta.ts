import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatAnchor } from "@angular/material/button";
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '.././clienteService';
import { Cliente } from '../cadastro/cliente';

@Component({
  imports: [MatInputModule, MatCardModule, MatIconModule, FormsModule, MatTableModule, MatAnchor, MatButtonModule],
  selector: 'app-consulta',
  styleUrl: './consulta.scss',
  templateUrl: './consulta.html',
})
export class ConsultaComponent implements OnInit {
  listaClientes: Cliente[] = []
  consultaTableColumns: string[] = ['id', 'nome', 'cpf','dataNascimento', 'email'];

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.listaClientes = this.clienteService.pesquisarCliente('');
  }
}
