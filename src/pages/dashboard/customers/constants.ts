type FormField = 'id' | 'name' | 'company' | 'email' | 'address' | 'phone';

interface CustomerForm {
  label: string;
  placeholder: string;
  id: string;
  key: FormField;
  type: string;
}

export const CUSTOMER_FORM: CustomerForm[] = [
  {
    label: 'Name',
    placeholder: 'Name',
    id: 'name',
    key: 'name',
    type: 'text',
  },
  {
    label: 'Company',
    placeholder: 'Company',
    id: 'company',
    key: 'company',
    type: 'text',
  },
  {
    label: 'Email',
    placeholder: 'Email',
    id: 'email',
    key: 'email',
    type: 'email',
  },
  {
    label: 'Phone Number',
    placeholder: '08123456789',
    id: 'phone',
    key: 'phone',
    type: 'tel',
  },

  {
    label: 'Address',
    placeholder: 'Address',
    id: 'address',
    key: 'address',
    type: 'text',
  },
];
