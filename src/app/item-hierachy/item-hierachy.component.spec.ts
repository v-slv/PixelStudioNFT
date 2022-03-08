import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHierachyComponent } from './item-hierachy.component';

describe('ItemHierachyComponent', () => {
  let component: ItemHierachyComponent;
  let fixture: ComponentFixture<ItemHierachyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHierachyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHierachyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
