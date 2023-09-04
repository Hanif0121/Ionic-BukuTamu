import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public formData: any = {};
  public clockInTime: string;
  public currentDate: string;
  public clockOutTime: string;
  public visitorPhotos: File | undefined;
  public whosVisitedOptions: any[] = [];
  public Bulanh: string;
  public Tahunh: string;


  constructor(private http: HttpClient, private router: Router) {
    this.fetchWhosVisitedOptions();
    const now = new Date();
    this.clockInTime = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Jakarta' });
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const year = now.getFullYear();
    const month = months[now.getMonth()];
    const date = now.getDate();
    const formattedDate = `${year}-${month}-${date}`;
    this.currentDate = formattedDate;
    this.clockOutTime = "00:00:00";
    const BulanS = ["JANUARY", "FEBUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const BulanA = BulanS[now.getMonth()];
    this.Bulanh = `${BulanA}`;
    const TahunA = now.getFullYear();
    this.Tahunh = `${TahunA}`;

    this.formData = {
      visitorName: '',
      companyName: '',
      visitorPhotos: null,
      visitDate: this.currentDate,
      visitPurpose: '',
      whosVisited: '',
      Devisi: '',
      clockIn: this.clockInTime,
      clockOut: this.clockOutTime,
      Bulan: this.Bulanh,
      Tahun: this.Tahunh,
      aktif: '0',
    };
  }

  onVisitorPhotosFileChanged(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = new Blob([uint8Array], { type: file.type });
        this.visitorPhotos = new File([blob], file.name, { type: file.type });
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  fetchWhosVisitedOptions() {
    const apiUrl = 'http://localhost:3200/whosvisited-options';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.whosVisitedOptions = response.options;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onNamaChange() {
    const nama = this.formData.whosVisited;
    const apiUrl = `http://localhost:3200/Devisi/${nama}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.formData.Devisi = response.devisi;
      },
      (error) => {
        console.error(error);
      }
    );
    const selectedOption = this.whosVisitedOptions.find(option => option.name === nama);
  if (selectedOption) {
    this.formData.Devisi = selectedOption.devisi;
  } else {
    this.formData.Devisi = '';
  }

  }



  create() {
    const formData = new FormData();
    formData.append('visitorName', this.formData.visitorName);
    formData.append('companyName', this.formData.companyName);
    formData.append('visitorPhotos', this.visitorPhotos ? this.visitorPhotos : '');
    formData.append('visitDate', this.formData.visitDate);
    formData.append('visitPurpose', this.formData.visitPurpose);
    formData.append('whosVisited', this.formData.whosVisited);
    formData.append('Devisi', this.formData.Devisi);
    formData.append('clockIn', this.formData.clockIn);
    formData.append('clockOut', this.formData.clockOut);
    formData.append('Bulan', this.formData.Bulan);
    formData.append('Tahun', this.formData.Tahun);
    formData.append('aktif', this.formData.aktif);

    const url = 'http://localhost:3200/visitor';

    this.http.post(url, formData).subscribe(
      (response) => {
        console.log('Response:', response);
        alert('Data successfully added');
        this.router.navigate(['/terimakasih']);
      },
      (error) => {
        console.error('Error:', error);
        alert('Data successfully added');
        this.router.navigate(['/terimakasih']);
      }
    );
  }
}
