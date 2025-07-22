import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { APPLICATION_CONSTANT, ENDPOINTCONSTANT } from '@datum/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiResponseDto, BranchDto, CompanyDto } from '@datum/models';
import { observable } from 'rxjs';
import { Router } from '@angular/router';
import { CurrentUserDto } from '../../../model/currentUserDto.model';
import { UserSettingDto,ShortcutMenuDto } from '@datum/models';
import { DataSharingService } from '@datum/services';

@Component({
  selector: 'app-authlogin.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authlogin.component.html',
  styleUrl: './authlogin.component.css',
})
export class AuthloginComponent {
  private loginService = inject(LoginService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  private dataSharingService = inject(DataSharingService);

  applicationConstants = APPLICATION_CONSTANT;

  companyList = signal<CompanyDto[]>([]);
  branchList = signal<BranchDto[]>([]);

  selectedCompany = signal<CompanyDto | null>(null);
  selectedBranch = signal<BranchDto | null>(null);

  constructor() {
    this.getCompanyList();
  }

  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    company: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    branch: [{ value: '', disabled: true }, Validators.required],
  });

  getCompanyList() {
    this.loginService
      .fetch<CompanyDto[]>(ENDPOINTCONSTANT.COMPANIES)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => {
          if (!res.isValid && res.httpCode !== 200) {
            console.log('Company List:', res.data);
          } else {
            this.companyList.set(res.data);
          }
        },
        error: (err) => console.error('Error fetching companies', err),
      });
  }

  onCompanySelect(): void {
    console.log('Company selected:', this.loginForm.get('company')?.value);
    const selectedCompanyId = Number(this.loginForm.get('company')?.value);
    const company = this.companyList().find((c) => c.id == selectedCompanyId);
    this.selectedCompany.set(company ?? null);

    if (company) {
      this.loginForm.get('branch')?.enable();
      this.loginService.getUUID();
      this.setDBConnection(company.id);
    }
  }

  setDBConnection(companyId: number) {
    this.loginService
      .setDBConnection(`${ENDPOINTCONSTANT.SETCONNECTION}${companyId}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.getBranchList(),
        error: (err) => console.error('Error setting DB connection', err),
      });
  }

  getBranchList(): void {
    this.loginService
      .fetch<BranchDto[]>(ENDPOINTCONSTANT.BRANCHES)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('Branch List:', res.data);
          this.branchList.set(res?.data || []);
          const defaultBranch = this.branchList()[0];
          if (defaultBranch) {
            this.loginForm.patchValue({ branch: defaultBranch.id.toString() });
            this.selectedBranch.set(defaultBranch);
          }
        },
        error: (err) => console.error('Error fetching branches', err),
      });
  }

  onBranchSelect(): void {
    const selectedBranchId = Number(this.loginForm.get('branch')?.value);
    const branch = this.branchList().find((b) => b.id == selectedBranchId);
    this.selectedBranch.set(branch ?? null);
  }


  onSubmit(): void {
    if (this.loginForm.invalid) return;
    //this.isLoading.set(true);
    const submissionData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      company: {
        id: this.selectedCompany()?.id,
        value: this.selectedCompany()?.name,
      },
      branch: {
        id: this.selectedBranch()?.id,
        value: this.selectedBranch()?.name,
      },
    };
    this.loginService
      .login<CurrentUserDto> (ENDPOINTCONSTANT.LOGIN, submissionData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
         // this.isLoading.set(false);

          const token = res.token;
console.log( res.token);
          if (!token) {
            this.loginService.setLocalStorageItem('access_token', '');
            this.loginService.setLocalStorageItem('username', '');
            this.loginService.setLocalStorageItem('curent_branch', '');
            this.loginService.setLocalStorageItem('settings', '');
            return;
          }
          this.loginService.setLocalStorageItem('username', this.loginForm.value.username!);
          this.loginService.setLocalStorageItem('access_token', token);
          this.loginService.setLocalStorageItem('curent_branch',res?.users.branchId);
          this.loginService.setLocalStorageItem('settings', res?.settings);
          //console.log('Login successful:', res);
          this.setNumericFormat(JSON.parse(res.settings));

          const menuItems = res?.userPageListView;
          if (menuItems) {
           // this.store.dispatch(loadMenuSuccess({ menuItems }));
            localStorage.setItem('menuData', JSON.stringify(menuItems));
           }
          await this.fetchShortcutMenu();

          this.dataSharingService.sharedData = JSON.stringify(menuItems);
          this.router.navigate(
            [this.applicationConstants?.appRouting?.MAIN_APP],
           // { queryParams: { menu: JSON.stringify(menuItems), name: 'Niyas' } }
          );
        
        },
        error: (err) => {
       //   this.isLoading.set(false);
         // this.baseService.showCustomDialogue('Invalid request');
          console.error('Error logging in', err);
        },
      });
  }
setNumericFormat(settings: UserSettingDto[]): void {

  console.log('User Settings:', settings);
  const numericFormatSetting = settings.find(s => s.Key === "NumericFormat");
  if (numericFormatSetting) {
    console.log('Numeric Format:', numericFormatSetting.Value);
    this.loginService.setLocalStorageItem('numericFormat', numericFormatSetting.Value);
  }
}


async fetchShortcutMenu(): Promise<void> {
  await this.loginService
    .fetch<ShortcutMenuDto[]>(ENDPOINTCONSTANT.FILLSHORTCUTMENU)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res) => {
        
        console.log('Shortcut Menu:', res.data);
        //this.shortcutMenu.set(res?.data || []);
      },
      error: (err) => console.error('Error fetching shortcut menu', err),
    });
}
}
