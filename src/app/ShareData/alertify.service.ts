import { Injectable } from "@angular/core";
declare let alertify: any;

@Injectable({
    providedIn: 'root'
})
export class AlertifyService {
    constructor() {}

    confirm(message: string, okCallback: () => any) {
        alertify.confirm(message, function(e) {
            if (e) {
                okCallback();
            } else {}
        });

    }

    Success(message: string) {
        alertify.success(message);
    }
    error(message: string) {
        alertify.error(message);
    }
    Warning(message: string) {
        alertify.Warning(message);
    }
    Message(message: string) {
        alertify.message(message);
    }
    

}