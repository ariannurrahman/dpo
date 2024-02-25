import { Customers } from 'types';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { DPO_API } from 'api';
import { useToast } from 'contexts/ToastsContext/ToastsContext';

interface UseCustomerProps {
  data?: Customers | undefined;
}

export const useCustomer = (props: UseCustomerProps) => {
  const { addToast } = useToast();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customers>({
    defaultValues: useMemo(() => {
      if (!props.data) {
        return undefined;
      }
      return props?.data;
    }, [props?.data]),
  });

  useEffect(() => {
    if (props?.data) {
      reset({ ...props?.data });
    } else {
      reset({
        address: '',
        company: '',
        email: '',
        name: '',
        phone: '',
        id: 0,
      });
    }
  }, [props?.data]);

  const onCreateCustomer = async (payload: Customers): Promise<boolean> => {
    const createPayload = { ...payload };
    delete createPayload.id;

    addToast('Success create customer', 'success');
    await DPO_API.post('/customer', createPayload);
    return true;
  };

  const onUpdateCustomer = async (payload: Customers) => {
    addToast('Success update customer', 'success');
    await DPO_API.put(`/customer/${payload.id}`, payload);
    return true;
  };

  const onDeleteCustomer = async (id: number | undefined) => {
    if (!id) return;
    addToast('Success delete customer', 'success');

    await DPO_API.delete(`/customer/${id}`);
    return true;
  };

  return {
    errors,
    onCreateCustomer: handleSubmit(onCreateCustomer),
    onUpdateCustomer: handleSubmit(onUpdateCustomer),
    onDeleteCustomer,
    register,
  };
};
