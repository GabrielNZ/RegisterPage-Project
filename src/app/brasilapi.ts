import { inject, Service } from '@angular/core';
import { Estado, Municipio } from './brasilapi.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Brasilapi {
    baseUrl = 'https://brasilapi.com.br/api';

    private http = inject(HttpClient);

    listarUFs(): Observable<Estado[]> {
        return this.http.get<Estado[]>(`${this.baseUrl}/ibge/uf/v1`);
    }

    listarMunicipios(uf: string): Observable<Municipio[]> {
        return this.http.get<Municipio[]>(this.baseUrl + '/ibge/municipios/v1/' + uf);
    }
}
