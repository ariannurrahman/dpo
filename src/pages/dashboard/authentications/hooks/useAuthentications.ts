import { DPO_API } from 'api';
import { useToast } from 'contexts/ToastsContext/ToastsContext';

export const useAuthentications = () => {
  const { addToast } = useToast();

  const onForceLogout = async (id: number | undefined) => {
    if (!id) return;
    addToast('Success force logout', 'success');

    const { data } = await DPO_API.delete(`/authentications/${id}`);
    return data;
  };

  return {
    onForceLogout,
  };
};
