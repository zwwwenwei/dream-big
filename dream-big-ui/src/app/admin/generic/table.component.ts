import { CommonModule } from '@angular/common';
import {
    Component,
    ContentChild,
    Input,
    NgModule,
    TemplateRef,
} from '@angular/core';

@Component({
    selector: 'app-table',
    template: `
    <div class="row text-center" >
        <h2>{{title}}</h2>
    </div>
    <div class="table_background">
        <table>
        <thead>
            <tr>
            <ng-container
                *ngTemplateOutlet="
                headers || defaultHeaderTemplate;
                context: { $implicit: data }
                "
            ></ng-container>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let row of data">
            <ng-container
                *ngTemplateOutlet="
                rows || defaultRowTemplate;
                context: { $implicit: row }
                "
            ></ng-container>
            </tr>
            <tr *ngIf="!data">
            <td colspan="100%" class="text-center">
                <span class="spinner-border spinner-border-lg align-center"></span>
            </td>
            </tr>
            <tr *ngIf="data.length== 0">
                <td colspan="100%" class="text-center">
                    None here. Try creating one.
                </td>
            </tr>
        </tbody>
        </table>
        <!-- If no template is provided use keys as headers and display all values -->
        <ng-template #defaultHeaderTemplate let-data>
        <th *ngFor="let header of data[0] | keyvalue">{{ header.key }}</th>
        </ng-template>
        <ng-template #defaultRowTemplate let-row>
        <td *ngFor="let row of row | keyvalue">{{ row.value }}</td>
        </ng-template>
    </div>
  `,
    styles: [
        `
        .table_background {
            display: flex;
            background-color: white;

            margin-left: 3vw;
            margin-right: 3vw;
            margin-bottom: 10vh;
            margin-top: 5vh;
            height: 100%;
            box-shadow: 0px 0px 10px rgba(114, 114, 113, 0.5);
            border-radius: 15px;

        }
        table {
            font-family: futura-pt, sans-serif;
            font-weight: 400;
            font-style: normal;
            border-collapse: collapse;
            width: 100%;
            border-radius: 15px;
            overflow:hidden
        }
      ::ng-deep table {
        th {
            font-size: 18px;
            text-align: left;
            padding: 20px 20px 20px 20px;
        }
        thead {
            background-color: #bbd4da;
        }
        table,
        td {
            padding: 8px 8px 8px 20px;
        }

        tr:nth-child(even) {
            background-color: #eff2f5;
        }
    }
    `,
    ],
})
export class TableComponent {
    @Input() data!: any[];
    @Input() title!: string;
    @ContentChild('headers') headers: TemplateRef<any> | undefined;
    @ContentChild('rows') rows: TemplateRef<any> | undefined;
}

@NgModule({
    imports: [CommonModule],
    declarations: [TableComponent],
    exports: [TableComponent],
})
export class TableComponentModule { }