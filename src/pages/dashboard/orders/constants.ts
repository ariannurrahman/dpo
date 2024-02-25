type FormField = 'customer';

interface OrderForm {
  label: string;
  placeholder: string;
  id: string;
  key: FormField;
  type: string;
}

export const ORDER_FORM: OrderForm[] = [
  {
    label: 'Customer',
    placeholder: 'Customer',
    id: 'customer',
    key: 'customer',
    type: 'text',
  },
];
