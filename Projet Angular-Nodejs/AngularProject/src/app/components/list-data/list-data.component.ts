import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MeetingRoomsService } from 'src/app/services/meetingRooms.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css'],
})
export class ListDataComponent implements OnInit {
  formValue!: UntypedFormGroup;
  updateFormValue!: UntypedFormGroup;
  listData!: any;
  editDataModal: any;
  searchTerm!: string;

  constructor(
    private meetingRoomsService: MeetingRoomsService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      capacity: [''],
      equipments: [''],
      description: [''],
    });

    this.updateFormValue = this.formBuilder.group({
      Id: [''],
      updateName: [''],
      updateCapacity: [''],
      updateEquipments: [''],
      updateDescription: [''],
    });

    this.getAllData();
  }

  getAllData(): void {
    this.meetingRoomsService.getData().subscribe((res: any) => {
      this.listData = res;
    });
  }

  postData(): void {
    const { value } = this.formValue;

    const dataObj = {
      name: value.name,
      capacity: value.capacity,
      equipments: value.equipments.split(','), // assuming equipments are comma-separated
      description: value.description,
    };

    this.meetingRoomsService.postData(dataObj).subscribe((res) => {
      this.listData.push(dataObj);
      this.formValue.reset();
    });
    this.getAllData();
  }

  editModal(editData: any) {
    this.editDataModal = editData;
  }

  updateData() {
    const { value } = this.updateFormValue;
    const dataObj = {
      id: value.Id,
      name: value.updateName,
      capacity: value.updateCapacity,
      equipments: value.updateEquipments.split(','), // assuming equipments are comma-separated
      description: value.updateDescription,
    };

    this.meetingRoomsService
      .updateData(dataObj, this.editDataModal._id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteData(data: any): void {
    this.meetingRoomsService.deleteData(data._id).subscribe((res) => {
      const index = this.listData.indexOf(data);
      this.listData.splice(index, 1);
    });
  }

  search(searchData: string): void {
    this.listData = this.listData.filter((val: any) =>
      val.name.toLowerCase().includes(searchData.toLowerCase())
    );
  }
}
