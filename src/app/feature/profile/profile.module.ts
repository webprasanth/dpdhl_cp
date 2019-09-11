import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './router/profile-routing.module';
import { ProfileDetailsComponent } from './container/profile-details/profile-details.component';
import { DetailsComponent } from './components/details/details.component';
import { ProfileConstant } from './constants/profile.constants'
import { IProfileForm } from '../profile/models/profile.models'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileResolverService } from './resolver/profile-resolver.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';


@NgModule({
    declarations: [
        ProfileDetailsComponent,
        DetailsComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MatDatepickerModule,
        MatNativeDateModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatButtonModule,
        // MatSelectModule

    ],
    providers: [
        ProfileResolverService
    ]
})
export class ProfileModule { }