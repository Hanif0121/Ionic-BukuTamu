import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visitor } from "../models/visitor.model";

@Injectable({
  providedIn: 'root'
})


export class VisitorService {
  apiUrl = 'http://localhost:3200/visitor';
  constructor(private http: HttpClient) { }

  addVisitor(visitorData: any) {
    return this.http.post(`${this.apiUrl}`, visitorData);;
  }
}
