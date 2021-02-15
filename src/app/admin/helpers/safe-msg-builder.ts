import { AppModule } from '../../app.module';

export class SafeMsgBuilder {
    private msg: string;
    private doc: any = AppModule.doc;
    private type: string;

    constructor() {
        this.init();
    }

    init() {
        this.msg = ""+this.type+" ";
    }

    setGender(gender) {
        this.type = gender == 'female'? 'الطالبة' : 'الطالب';
        this.init();
        return this;
    }

    setName(name) {
        this.msg += name;
        return this;
    }

    setCode(code) {
        this.msg += " ";
        this.msg += "كود "+this.type+" " + code;
        return this;
    }

    setLevel(level) {
        if (!level)
            return this;
        this.msg += " ";
        this.msg += "مستوى "+this.type+"  " + level;
        return this;
    }

    setDivision(division) {
        if (!division)
            return this;
        this.msg += " ";
        this.msg += " والشعبة " + division;
        return this;
    }

    setOldBalance(value) {
        this.msg += " ";
        this.msg += " "+this.type+" مدين برسوم سابقة بقيمة " + value + " جنيه ";
        return this;
    }
    
    setCurrentBalance(value) {
        this.msg += " ";
        this.msg += " ورسوم حالية " + value + " جنيه ";
        return this;
    }

    setPaidValue(value) {
        this.msg += " ";
        this.msg += "  المبلغ المطلوب دفعهُ " + value + " جنيه ";
        return this;
    }

    say() {
        this.doc.say(this.msg);
    }

}
