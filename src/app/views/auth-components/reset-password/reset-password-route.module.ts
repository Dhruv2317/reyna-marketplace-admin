import { NgModule } from "@angular/core";
import { RouterModule, Routes, ActivatedRouteSnapshot } from "@angular/router";
import { ResetPasswordComponent } from "./reset-password.component";

const routes: Routes = [
    {
        path: "", component: ResetPasswordComponent,
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ResetPasswordRoutingModule { }
