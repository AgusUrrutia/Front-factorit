import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesVipComponent } from './clientes-vip.component';

describe('ClientesVipComponent', () => {
  let component: ClientesVipComponent;
  let fixture: ComponentFixture<ClientesVipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesVipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
