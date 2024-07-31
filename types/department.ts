export interface Department {
    id: number;
    name: string;
    code: string;
    tutor_first_name:string;
    tutor_last_name:string;
    head_of_department: number; // This could be an ID or reference to a User/Employee entity
    description: string;
    created_at: string; // You might want to use Date type if you handle dates more comprehensively
    updated_at: string; // Same as above, Date type might be preferable
}
