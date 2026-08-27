import { Service } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Service()
export class ClienteService {
    static REPO_CLIENTES = '_CLIENTES';

    cadastrarCliente(cliente: Cliente) {
        const storage = this.obterStorage();
        storage.push(cliente);
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
        console.log(this.obterStorage())
    }
    pesquisarCliente(nome: string): Cliente[] {
        return this.obterStorage()
    }

    private obterStorage(): Cliente[] {
        const clientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
        if (clientes) {
            return JSON.parse(clientes);
        } else {
            localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify([]));
        }
        return [];
    }
}
    