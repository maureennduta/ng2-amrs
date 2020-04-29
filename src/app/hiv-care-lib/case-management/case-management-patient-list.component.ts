
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { GridOptions } from 'ag-grid';

import { CaseManagementResourceService } from './../../etl-api/case-management-resource.service';


@Component({
    selector: 'case-management-patient-list',
    templateUrl: './case-management-patient-list.component.html',
    styleUrls: ['./case-management-patient-list.component.css']
})

export class CaseManagementPatientListComponent implements OnInit {

  public title = '';
  public patients: any = [];
  public patient: any;
  public patientUuid: any;
  public currentManager: any;
  public newManager: any;
  public rowData: any = [];
  public params: any;
  public busy: Subscription;
  public display = false;
  public gridOptions: GridOptions = {
    enableColResize: true,
    enableSorting: true,
    enableFilter: true,
    showToolPanel: false,
    pagination: true,
    paginationPageSize: 300,
    onGridSizeChanged: () => {
      if (this.gridOptions.api) {
       // this.gridOptions.api.sizeColumnsToFit();
      }
    },
    onGridReady: () => {
      if (this.gridOptions.api) {
        // this.gridOptions.api.sizeColumnsToFit();
      }
    }
  };
  public retentionSummaryColdef: any = [
    {
      lockPosition: true,
      headerName: 'No',
      valueGetter: 'node.rowIndex + 1',
      cellClass: 'locked-col',
      width: 50,
      suppressNavigable: true,
      pinned: 'left'
    },
    {
      headerName: 'Case Manager',
      field: 'case_manager',
      width: 400,
      pinned: 'left'
    },
    {
      headerName: 'Name',
      field: 'person_name',
      width: 200,
      pinned: 'left'
    },
    {
      headerName: 'Age',
      field: 'age',
      width: 50
    },
    {
      headerName: 'Gender',
      field: 'gender',
      width: 70
    },
    {
      headerName: 'Last Followup Date',
      field: 'phone_number',
      width: 100
    },
    {
      headerName: 'Days Since Followup',
      field: 'alternate_phone_number',
      width: 170
    },
    {
      headerName: 'RTC',
      field: 'program',
      width: 250
    },
    {
      headerName: 'Phone RTC',
      field: 'visit_type',
      width: 200
    },
    {
      headerName: 'Last VL',
      field: 'last_vl',
      width: 150
    },
    {
      headerName: 'Due for VL',
      field: 'due_for_vl',
      width: 100
    },
    {
      headerName: 'Missed Appoitment',
      field: 'current_vl_date',
      width: 150
    },
    {
      headerName: 'Action',
      field: 'action',
      template: this.buttonRenderer(),
      width: 400
    },
    {
      headerName: 'Patient Uuid',
      field: 'patient_uuid',
      width: 300,
      hide: true
    }

  ];


  constructor(private router: Router,
    private route: ActivatedRoute,
    private caseManagementResourceService: CaseManagementResourceService) {

  }

  public ngOnInit() {

  }

  public followUp() {
    // Redirect to form with patients
  }

  public changeManager(data) {
    this.display = true;
    this.patient = data.person_name;
    this.patientUuid = data.uuid;

  }
  public updateCaseManager() {
    // TODO: Implement update service
  }
  public onCellClicked(e) {
    if (e.event.target !== undefined) {
        const data = e.data;
        const actionType = e.event.target.getAttribute('data-action-type');

        switch (actionType) {
            case 'followup':
                return this.followUp();
            case 'changemanager':
                return this.changeManager(data);
        }
    }
}

public dismissDialog() {
  this.display = false;
}
  public buttonRenderer() {
    return '<div class="button"><span>' +
      '<button type="button" data-action-type="followup" class="btn btn-primary btn-sm">Follow Up</button>' +
      '</span>' +
      '<span>' +
      '<button type="button" data-action-type="changemanager" class="btn btn-default btn-sm">Change Manager</button></span>' +
      '</div>';
     }
}
