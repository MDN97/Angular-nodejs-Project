import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css'],
})
// Assuming Reservation interface and service are properly defined
export class ListReservationsComponent implements OnInit {
  formValue!: FormGroup;
  updateFormValue!: FormGroup;
  listData: Reservation[] = [];
  editDataModal: Reservation | null = null;
  searchTerm: string = '';

  constructor(
    private reservationsService: ReservationsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      user: [''],
      meetingRoom: [''],
      startTime: [''],
      endTime: [''],
    });

    this.updateFormValue = this.formBuilder.group({
      Id: [''],
      updateUser: [''],
      updateMeetingRoom: [''],
      updateStartTime: [''],
      updateEndTime: [''],
    });

    this.getAllData();
  }

  getAllData(): void {
    this.reservationsService.getData().subscribe((res: Reservation[]) => {
      this.listData = res;
    });
  }

  postData(): void {
    const { value } = this.formValue;

    const dataObj: Reservation = {
      user: value.user,
      meetingRoom: value.meetingRoom,
      startTime: new Date(value.startTime),
      endTime: new Date(value.endTime),
    };

    this.reservationsService.postData(dataObj).subscribe((res: Reservation) => {
      this.listData.push(res);
      this.formValue.reset();
    });
  }

  editModal(editData: Reservation): void {
    this.editDataModal = { ...editData };

    // Set values in update form
    this.updateFormValue.patchValue({
      Id: editData._id,
      updateUser: editData.user,
      updateMeetingRoom: editData.meetingRoom,
      updateStartTime: editData.startTime.toISOString().slice(0, 16),
      updateEndTime: editData.endTime.toISOString().slice(0, 16),
    });
  }

  updateData(): void {
    const { value } = this.updateFormValue;

    const dataObj: Reservation = {
      user: value.updateUser,
      meetingRoom: value.updateMeetingRoom,
      startTime: new Date(value.updateStartTime),
      endTime: new Date(value.updateEndTime),
    };

    if (this.editDataModal) {
      this.reservationsService
        .updateData(dataObj, this.editDataModal._id!)
        .subscribe((data) => {
          this.getAllData();
          this.editDataModal = null;
        });
    }
  }

  deleteData(data: Reservation): void {
    if (data._id) {
      this.reservationsService.deleteData(data._id).subscribe(() => {
        const index = this.listData.indexOf(data);
        if (index !== -1) {
          this.listData.splice(index, 1);
        }
      });
    }
  }

  search(searchData: string): void {
    this.listData = this.listData.filter((val: Reservation) => {
      return val.user.toLowerCase().includes(searchData.toLowerCase());
    });
  }
}
