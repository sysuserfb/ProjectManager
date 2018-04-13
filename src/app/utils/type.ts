export class Report {
    user_id: number;
    user_name: string;
    email: string;
    content: string;
    report_id: number;
    version_id: number;
    version: string;
    submite_date: string;

    constructor() {
        this.user_id = 0;
        this.user_name = "username";
        this.email = "@example.com";
        this.content = "";
        this.report_id=0;
        this.version_id=0;
        this.version="0.0";
        this.submite_date="2018.1.1";
    };
}
export class SystemMessage {
    title: string;
    content: string;
    constructor() {
        this.title = "";
        this.content = "";
    };
}

export class searchOption{
    value:any;
    label:string;
    constructor(){
        this.value=0;
        this.label=""
    }
}