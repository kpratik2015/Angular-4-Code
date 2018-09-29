import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('An unexpected error occurred.');
        console.log(error);
        // in future we can replace it with toast that will log error to server
    }

    // Register as dependency in app module
}