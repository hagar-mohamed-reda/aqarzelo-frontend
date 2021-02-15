import { Message } from '../../shared/message';
import { StudentAccountService } from '../services/student-account.service';
import { Auth } from '../../shared/auth';
import { environment } from '../../../environments/environment';
import { AppModule } from '../../app.module';


export class Payment {

    public safeObject: any;
    public studentId: number;
    public value: number;
    public studentAcountService: StudentAccountService;
    public action: any;

    constructor(safeObject: any, studentAcountService: StudentAccountService, action: any) {
        this.safeObject = safeObject;
        this.studentId = safeObject.id;
        this.value = safeObject.paid_value;
        this.studentAcountService = studentAcountService;
        this.action = action;
    }

    /**
     * validate on the data
     */
    validate() {
        let valid = true;
        if (this.studentId <= 0 || this.value <= 0 && this.safeObject.payment_type != 'service') {
            valid = false;
        }
        return valid;
    }

    /**
     * permform payment of the student
     */
    pay() {
        if (!this.validate())
            return Message.error('select a student or not value to pay');

        let data = {
            api_token: Auth.getApiToken(),
            student_id: this.studentId,
            value: this.value,
            payment_type: this.safeObject.payment_type,
            services: this.safeObject.services
        };
        this.studentAcountService.studentPay(data).subscribe((r)=> {
            const response: any = r;
            if (response.status == 1) {
                Message.success(response.message);
                this.action();
                Payment.loadReceipts(response.data);
            }
            else
                Message.error(response.message);

        });
    }

    public static loadReceipts(data: any) {
        data.forEach(element => {
            Payment.viewReceipt(element.id);
        });
    }

    public static viewReceipt(paymentId) {
        const options = "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=905,height=484";
        const data = {
            api_token: Auth.getApiToken(),
            payment_id: paymentId
        };
        const url = environment.apiUrl + "/account/payment_receipt?" + AppModule.doc.jquery.param(data);
        window.open(url, "_blank", options);
    }

}
