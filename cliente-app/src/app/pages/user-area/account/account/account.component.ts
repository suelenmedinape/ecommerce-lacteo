import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../../../autentication/interface/account/user';
import { AccountService } from '../../../../autentication/service/account/account.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  profileForm!: FormGroup
  client: Client | null = null
  isLoading = true
  isEditing = false
  submitSuccess = false
  errorMessage = ""

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadClientDetails()
    this.initForm()
  }

  loadClientDetails(): void {
    this.isLoading = true
    this.accountService.getClientDetails().subscribe({
      next: (data) => {
        this.client = data
        this.updateForm(data)
        this.isLoading = false
      },
      error: (error) => {
        console.error("Erro ao carregar dados do perfil", error)
        this.errorMessage = "Não foi possível carregar seus dados. Tente novamente mais tarde."
        this.isLoading = false
      },
    })
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      name: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }],
      phone: ["", [Validators.pattern(/^\d{10,11}$/)]],
      cpf: ["", [Validators.pattern(/^\d{11}$/)]],
      address: this.fb.group({
        street: ["", Validators.required],
        number: ["", Validators.required],
        neighborhood: ["", Validators.required],
        state: ["", Validators.required],
      }),
    })
  }

  updateForm(client: Client): void {
    this.profileForm.patchValue({
      name: client.name,
      email: client.email,
      phone: client.phone || "",
      cpf: client.cpf || "",
      address: client.address || {
        street: "",
        number: "",
        neighborhood: "",
        state: "",
      },
    })
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing
    this.submitSuccess = false

    if (!this.isEditing) {
      // Reset form to original values if canceling edit
      if (this.client) {
        this.updateForm(this.client)
      }
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return
    }

    const updatedClient: Client = {
      ...this.client!,
      phone: this.profileForm.get("phone")?.value || null,
      cpf: this.profileForm.get("cpf")?.value || null,
      address: this.profileForm.get("address")?.value || null,
    }

    this.accountService.updateClientDetails(updatedClient).subscribe({
      next: (response) => {
        this.client = response
        this.submitSuccess = true
        this.isEditing = false
        this.errorMessage = ""
      },
      error: (error) => {
        console.error("Erro ao atualizar perfil", error)
        this.errorMessage = "Não foi possível atualizar seu perfil. Tente novamente mais tarde."
      },
    })
  }

  get addressForm() {
    return this.profileForm.get("address") as FormGroup
  }
}
