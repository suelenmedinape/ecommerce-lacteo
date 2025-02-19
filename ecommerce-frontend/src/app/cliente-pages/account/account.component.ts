import { Component, OnDestroy } from "@angular/core";
import { AsyncPipe, NgIf } from "@angular/common";
import { AccountService } from "../../service/account.service";
import { Observable, Subject, catchError, of } from "rxjs";
import { AccountDetails } from "../../Models/models/account-details";


@Component({
  selector: "app-account",
  template: `
    @if (clientDetails$ | async; as clientDetails) {
      <h2>Client Details</h2>
      <p>Name: {{ clientDetails.name }}</p>
      <p>Email: {{ clientDetails.email }}</p>
      <p>phone: {{ clientDetails.phone }}</p>
      <p>address: {{ clientDetails.address }}</p>
      <p>cpf: {{ clientDetails.cpf }}</p>
    } @else if (error) {
      <p>Error: {{ error }}</p>
    } @else {
      <p>Loading client details...</p>
    }
  `,
  standalone: true,
  imports: [AsyncPipe],
  providers: [AccountService],
})
export class AccountComponent implements OnDestroy {
  clientDetails$: Observable<AccountDetails | null>;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private accountService: AccountService) {
    this.clientDetails$ = this.accountService.getAccountDetails().pipe(
      catchError((err) => {
        this.error = "Failed to load client details. Please try again later.";
        console.error("Error fetching client details:", err);
        return of(null); // Retorna um observable nulo para evitar quebra do fluxo
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
