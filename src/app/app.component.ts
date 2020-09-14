import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';
  users;
  // displayed columns for the usertable
  displayedColumns: string[] = ['select','albumId' ,'id','title','url','thumbnailUrl','actions'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData | any>(true, []);

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  constructor(private _data:DataService,private cdref: ChangeDetectorRef){
    this.getData()
    this.dataSource = new MatTableDataSource();

  }
  data = Object.assign(UserData);
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.users.findIndex(d => d === item);
      this.users.splice(index,1)
      this.dataSource = new MatTableDataSource<UserData>(this.users);
    });
    this.selection = new SelectionModel<UserData>(true, []);
  }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.data = this.users;
    this.cdref.detectChanges();
}
  getData(){
    this._data.getData().subscribe(
      res=>{
      console.log(res)
      this.users=res;
      this.dataSource.data=this.users;
      },
      err=>{
        console.log(err)
      }
    )
  }
}

export class UserData{
  albumId: number
id: number
title: string
url: string
thumbnailUrl:string
}