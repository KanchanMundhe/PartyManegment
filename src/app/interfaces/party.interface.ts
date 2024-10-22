export interface Party {
    id?: number;
    name?: string;
    company_name: string;
    mobile_no: string;
    telephone_no?: string;
    whatsapp_no?: string;
    email?: string;
    remark?: string;
    login_access: boolean;
    date_of_birth?: string;
    anniversary_date?: string;
    gstin?: string;
    pan_no?: string;
    apply_tds: boolean;
    credit_limit: number;
    image?: File | null;
    address: Address[];
    bank: Bank[];
    [key: string]: any;
  }
  
  export interface Address {
    id?: number;
    address_line_1: string;
    address_line_2: string;
    country: string;
    state: string;
    city: string;
    pincode: string;
  }
  
  export interface Bank {
    id?: number;
    bank_ifsc_code: string;
    bank_name: string;
    branch_name: string;
    account_no: string;
    account_holder_name: string;
  }
  