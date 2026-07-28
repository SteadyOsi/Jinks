import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatThumbNail } from './chat-thumb-nail';

describe('ChatThumbNail', () => {
  let component: ChatThumbNail;
  let fixture: ComponentFixture<ChatThumbNail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatThumbNail],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatThumbNail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
