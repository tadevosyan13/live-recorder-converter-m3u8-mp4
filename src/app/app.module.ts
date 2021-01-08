import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BlobService} from './hero.service';
import { HttpClientModule } from '@angular/common/http';
import { VideojsRecordComponent } from './videojs-record/videojs-record.component';

@NgModule({
  declarations: [
    AppComponent,
    VideojsRecordComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule
  ],
  providers: [BlobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
