import { Component, OnInit } from '@angular/core';
import { Part } from '../../model/part'
import { PartService } from '../../services/models/part/part.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
  parts: Part[] = [];

  constructor(private partService: PartService) { }

  ngOnInit(): void {
    this.getParts();
  }

  add(partName: string, numberInStock: number, partPrice: number): void {
    partName = partName.trim();
    if (!partName) { return; }
    this.partService.addPart({ partName, numberInStock, partPrice } as Part)
      .subscribe(part => {
        this.parts.push(part);
      });
  }

  getParts(): void {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts);
  }

  delete(part: Part): void {
    this.parts = this.parts.filter(p => p !== part);
    this.partService.deletePart(part.partID).subscribe();
  }
}
