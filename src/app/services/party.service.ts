import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Party } from '../interfaces/party.interface';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private baseUrl = 'https://ap.greatfuturetechno.com/party/';

  constructor(private http: HttpClient) {}

  getParties(): Observable<Party[]> {
    return this.http.get<Party[]>(this.baseUrl);
  }

  getParty(id: number): Observable<Party> {
    return this.http.get<Party>(`${this.baseUrl}?id=${id}`);
  }

  createParty(party: Party): Observable<Party> {
    const formData = this.prepareFormData(party);
    return this.http.post<Party>(this.baseUrl, formData);
  }

  updateParty(id: number, party: Party): Observable<Party> {
    const formData = this.prepareFormData(party);
    return this.http.put<Party>(`${this.baseUrl}?id=${id}`, formData);
  }

  deleteParty(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }

  private prepareFormData(party: Party): FormData {
    const formData = new FormData();
    
    // Handle each property explicitly
    if (party.name) formData.append('name', party.name);
    if (party.company_name) formData.append('company_name', party.company_name);
    if (party.mobile_no) formData.append('mobile_no', party.mobile_no);
    if (party.telephone_no) formData.append('telephone_no', party.telephone_no);
    if (party.whatsapp_no) formData.append('whatsapp_no', party.whatsapp_no);
    if (party.email) formData.append('email', party.email);
    if (party.remark) formData.append('remark', party.remark);
    formData.append('login_access', party.login_access.toString());
    if (party.date_of_birth) formData.append('date_of_birth', party.date_of_birth);
    if (party.anniversary_date) formData.append('anniversary_date', party.anniversary_date);
    if (party.gstin) formData.append('gstin', party.gstin);
    if (party.pan_no) formData.append('pan_no', party.pan_no);
    formData.append('apply_tds', party.apply_tds.toString());
    formData.append('credit_limit', party.credit_limit.toString());
    
    // Handle arrays
    if (party.address) {
      formData.append('address', JSON.stringify(party.address));
    }
    if (party.bank) {
      formData.append('bank', JSON.stringify(party.bank));
    }
    
    // Handle image
    if (party.image) {
      formData.append('image', party.image);
    }

    return formData;
  }
}