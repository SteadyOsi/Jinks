import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationPreview } from './conversation-preview';

describe('ConversationPreview', () => {
  let component: ConversationPreview;
  let fixture: ComponentFixture<ConversationPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
