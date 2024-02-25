import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

import { Orders } from 'types';
import { DPO_API } from 'api';
import { useToast } from 'contexts/ToastsContext/ToastsContext';

interface useOrdersProps {
  data?: Orders | undefined;
}

export const useOrders = (props: useOrdersProps) => {
  const { addToast } = useToast();
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Orders>({
    defaultValues: useMemo(() => {
      if (!props.data) {
        return { items: [{ name: '', amount: 0, price: 0 }], customer: '' };
      }
      return props?.data;
    }, [props?.data]),
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'items',
  });

  useEffect(() => {
    if (props?.data) {
      reset({ ...props?.data });
    } else {
      reset({});
    }
  }, [props?.data]);

  const onCreateOrder = async (payload: Orders) => {
    const createPayload = { ...payload };
    delete createPayload.id;

    addToast('Success create order', 'success');

    const { data } = await DPO_API.post('/order', createPayload);
    return { data, message: 'success' };
  };

  const onUpdateOrder = async (payload: Orders) => {
    addToast('Success update order', 'success');
    const { data } = await DPO_API.put(`/order/${payload.id}`, payload);
    return { data, message: 'success' };
  };

  const onDeleteOrder = async (id: number | undefined) => {
    if (!id) return;
    addToast('Success delete order', 'success');

    const { data } = await DPO_API.delete(`/order/${id}`);
    return { data, message: 'success' };
  };

  return {
    errors,
    onCreateOrder: handleSubmit(onCreateOrder),
    onUpdateOrder: handleSubmit(onUpdateOrder),
    onDeleteOrder,
    register,
    control,
    fields,
    remove,
    append,
  };
};
