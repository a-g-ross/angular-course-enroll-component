import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class BaseService {
  public readonly API_URL: string = environment.apiUrl;

  public readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
