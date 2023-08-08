'use client';

import { toast } from 'react-toastify';
import { Axios } from '../axiosConfig';
import { ChangeEventHandler, useState } from 'react';
import DisplayContent from './DisplayContent';
import { AxiosResponse } from 'axios';
import { Response } from '../@types';
import LoadingAnimation from './LoadingAnimation';

export default function InputInitialPage(): JSX.Element {
  const [formValue, setFormValue] = useState('');
  const [apiData, setApiData] = useState({} as Response);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmmit = async () => {
    if (!formValue) {
      toast.error('Digite algum valor!');
      return;
    }
    try {
      setIsLoading(true);
      const response: AxiosResponse = await Axios.get('', {
        params: {
          uasg: formValue,
          offset: 25,
        },
      });
      setApiData(response.data);
    } catch (error) {
      toast.error('Erro ao realizar requisição!');
      setIsLoading(false);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    let value = e.target.value;
    const regex = /[a-zA-Z]/g;
    const formattedValue = value.replaceAll(regex, '');
    setFormValue(formattedValue);
  };

  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex w-full h-full self-center justify-center">
        <input
          className="text-black w-[40%] self-center p-2 focus:max-w-xl transition-all duration-700 rounded-md max-w-[400px]"
          placeholder="Digite uma UASG ex:153229"
          onChange={(e) => handleChange(e)}
          value={formValue}
        />
        <button
          onClick={handleSubmmit}
          className="text-white border-2 border-solid border-white bg-[#117522] p-2 rounded-md hover:bg-white hover:text-[#117522] "
        >
          Procurar
        </button>
      </div>
      <DisplayContent content={apiData} onLoad={onLoad} />
      {isLoading && <LoadingAnimation />}
    </div>
  );
}
