import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../services/party.service';
import { Party } from '../../interfaces/party.interface';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html'
})
export class PartyListComponent implements OnInit {
  parties: Party[] = [];
  loading = false;
  error = '';

  constructor(private partyService: PartyService) {}

  ngOnInit(): void {
    this.loadParties();
  }

  loadParties(): void {
    this.loading = true;
    this.partyService.getParties().subscribe({
      next: (data:any) => {
        this.parties = data;
        this.loading = false;
      },
      error: (err:any) => {
        this.error = 'Error loading parties';
        this.loading = false;
      }
    });
  }

  deleteParty(id: number): void {
    if (confirm('Are you sure you want to delete this party?')) {
      this.partyService.deleteParty(id).subscribe({
        next: () => {
          this.parties = this.parties.filter(party => party.id !== id);
        },
        error: (err:any) => {
          this.error = 'Error deleting party';
        }
      });
    }
  }
}