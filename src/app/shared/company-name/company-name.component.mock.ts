import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-company-name',
    template: ''
})
export class MockCompanyNameComponent {
    @Input() symbol: string = ''
}