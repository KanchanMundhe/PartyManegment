// app/components/party-form/party-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from '../../services/party.service';
import { Party } from '../../interfaces/party.interface';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html'
})
export class PartyFormComponent implements OnInit {
  partyForm: FormGroup;
  isEditMode = false;
  partyId?: number;
  loading = false;
  error = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private partyService: PartyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.partyForm = this.createForm();
  }

  ngOnInit(): void {
    this.partyId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.partyId) {
      this.isEditMode = true;
      this.loadParty(this.partyId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [''],
      company_name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      telephone_no: [''],
      whatsapp_no: [''],
      email: ['', [Validators.email]],
      remark: [''],
      login_access: [false],
      date_of_birth: [''],
      anniversary_date: [''],
      gstin: [''],
      pan_no: [''],
      apply_tds: [false],
      credit_limit: [0, [Validators.required, Validators.min(0)]],
      image: [null],
      address: this.fb.array([]),
      bank: this.fb.array([])
    });
  }

  createAddressFormGroup(): FormGroup {
    return this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  createBankFormGroup(): FormGroup {
    return this.fb.group({
      bank_ifsc_code: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      account_holder_name: ['', Validators.required]
    });
  }

  get addressArray(): FormArray {
    return this.partyForm.get('address') as FormArray;
  }

  get bankArray(): FormArray {
    return this.partyForm.get('bank') as FormArray;
  }

  addAddress(): void {
    this.addressArray.push(this.createAddressFormGroup());
  }

  removeAddress(index: number): void {
    this.addressArray.removeAt(index);
  }

  addBank(): void {
    this.bankArray.push(this.createBankFormGroup());
  }

  removeBank(index: number): void {
    this.bankArray.removeAt(index);
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.partyForm.patchValue({ image: file });
    }
  }

  loadParty(id: number): void {
    this.loading = true;
    this.partyService.getParty(id).subscribe({
      next: (party) => {
        // Clear existing arrays
        while (this.addressArray.length) {
          this.addressArray.removeAt(0);
        }
        while (this.bankArray.length) {
          this.bankArray.removeAt(0);
        }

        // Add existing addresses and banks
        party.address?.forEach(() => this.addAddress());
        party.bank?.forEach(() => this.addBank());

        // Set form values
        this.partyForm.patchValue(party);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading party details';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.partyForm.valid) {
      this.loading = true;
      const partyData = this.partyForm.value;

      const observable = this.isEditMode
        ? this.partyService.updateParty(this.partyId!, partyData)
        : this.partyService.createParty(partyData);

      observable.subscribe({
        next: () => {
          this.router.navigate(['/parties']);
        },
        error: (err) => {
          this.error = 'Error saving party details';
          this.loading = false;
        }
      });
    }
  }
}