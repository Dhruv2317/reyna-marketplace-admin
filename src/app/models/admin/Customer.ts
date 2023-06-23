export interface CustomerDetails {
    id?: number;
    first_name: string;
    last_name: string;
    display_name?: string;
    username: string;
    email: string;
    cell_phone_number: string;
    emailPhoneConsent?: boolean;
    gender?: string;
    date_of_birth: string;
    address: {
        address_line1: string;
        address_line2?: string;
        city?: {}
        city_name: string;
        state_id: number;
        zipcode: string;
    }
}
