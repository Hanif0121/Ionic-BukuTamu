import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3200/visitor'; // Ganti dengan URL API Anda

  constructor(private http: HttpClient) { }

  getDevisiByNama(nama: string) {
    const url = `${this.baseUrl}/karyawan?Nama_Karyawan=${nama}`; // Ganti dengan endpoint API Anda untuk mengambil data devisi berdasarkan nama
    return this.http.get(url);
  }
}