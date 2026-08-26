import { Service } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Service()
export class ClienteService {
    static REPO_CLIENTES = '_CLIENTES';

    cadastrarCliente(cliente: Cliente) {
        const storage = this.obterStorage();
        storage.push(cliente);
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }
    obterStorage(): Cliente[] {
        const clientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
        return clientes ? JSON.parse(clientes) : localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify([])), [];
    }
}
    