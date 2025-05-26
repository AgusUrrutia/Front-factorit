import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product';
import { ProductsService } from '../../core/services/products/products.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../core/services/carrito/carrito.service';
import { SharedService } from '../../core/services/shared/shared.service';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit{
  listProducts: Product[] = [];
  displayedColumns: string[] = ['productId', 'name', 'category', 'price', 'description', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductsService,
    private carritoService: CarritoService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.listProducts = products;
        this.dataSource.data = products;
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  agregarProducto(productId: string) {
    this.carritoService.agregarProducto(productId, 1).subscribe(() => {
      this.carritoService.getCarrito().subscribe(cart => {
        this.sharedService.updateCart(cart);
      });
    });
  }
  
  eliminarProducto(productId: string) {
    this.carritoService.eliminarProducto(productId, 1).subscribe(() => {
      this.carritoService.getCarrito().subscribe(cart => {
        this.sharedService.updateCart(cart);
      });
    });
  }

}
