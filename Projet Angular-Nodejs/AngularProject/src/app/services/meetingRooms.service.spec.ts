import { TestBed } from '@angular/core/testing';

import { MeetingRoomsService } from './meetingRooms.service';

describe('MeetingRoomsService', () => {
  let service: MeetingRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
