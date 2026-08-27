import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../clienteService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class CadastroComponent {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router : Router) {

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
        }
      }
    })

  }

  cadastrarCliente() {
    if (!this.atualizando) {
      this.clienteService.cadastrarCliente(this.cliente);
      this.cliente = Cliente.newCliente();
    } else {
      this.clienteService.atualizarCliente(this.cliente);
      this.router.navigate(['/consulta']);
    }
  }
}
