import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResipeDetailPage } from './resipe-detail.page';

describe('ResipeDetailPage', () => {
  let component: ResipeDetailPage;
  let fixture: ComponentFixture<ResipeDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResipeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
