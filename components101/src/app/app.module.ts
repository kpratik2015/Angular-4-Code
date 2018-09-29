import { FavoriteComponent } from './favorite.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import { InputFormatDirective } from './input-format.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';

// this is required for http consuming. If you inject in component Http and do not
// put this in providers then it will give error that there is no provider for Http
import { HttpModule } from '@angular/http'; 
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    MyNewComponentComponent,
    FavoriteComponent,
    InputFormatDirective,
    ContactFormComponent,
    SignupFormComponent,
    NewCourseFormComponent,
    PostsComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    PostService,
    // we want angular to replace its default errorhandler with our errorhandler. So we pass in object
    { provide: ErrorHandler, useClass: AppErrorHandler } // telling angular that wherever errorhandler is used, use apperrorhandler instead
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
