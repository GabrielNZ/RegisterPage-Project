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
    pesquisarCliente(nome: string): Cliente[] {
        if (nome) {
            return this.obterStorage().filter(cliente => cliente.nome?.toLowerCase().includes(nome.toLowerCase()));
        }
        return this.obterStorage()
    }
    pesquisarClientePorId(id: string): Cliente {
        const cliente = this.obterStorage()
        return cliente.find(cliente => cliente.id === id) || Cliente.newCliente();
    }
    atualizarCliente(cliente: Cliente) {
        const storage = this.obterStorage();
        storage.forEach((c) => {
            if (c.id === cliente.id) {
                Object.assign(c, cliente);
            }
        })
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
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
