'use client';
import { useState } from 'react';
import { Response } from '../@types';
import { AiTwotoneCalendar } from 'react-icons/ai';
import Modal from './Modal';

type Props = {
  content: Response | null;
  onLoad: () => void;
};

export default function DisplayContent({ content, onLoad }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const hasContent = content?._embedded?.contratos;

  if (!hasContent) return null;

  if (content.count === 0) {
    onLoad();
    return <h1 className="text-white self-center mt-10">Nenhum resultado</h1>;
  }

  const totalPages = Math.ceil(content._embedded.contratos.length / 25);
  const startIndex = (currentPage - 1) * 25;
  const endIndex = startIndex + 25;
  const itemsToShow = content._embedded.contratos.slice(startIndex, endIndex);

  onLoad();

  return (
    <>
      <ul className="grid text-black md:grid-cols-2 auto-rows-fr gap-5 lg:p-20 p-10">
        {itemsToShow.map((contrato, index) => (
          <li
            key={index}
            className="bg-white  rounded-md flex flex-col items-center w-full self-center p-6 h-full justify-center"
          >
            <h1 className="text-lg text font-bold line-clamp-3 text-center">{contrato.objeto}</h1>
            <div className="md:flex gap-2">
              <h6 className="flex items-center gap-2 m-2 text-sm">
                <AiTwotoneCalendar />
                Data de assinatura: {contrato.data_assinatura}
              </h6>
              <h6 className="flex items-center gap-2 m-2 text-sm">
                <AiTwotoneCalendar />
                Data de início da vigência: {contrato.data_inicio_vigencia}
              </h6>
            </div>
            <h6 className="flex items-center gap-2 m-2 text-sm">
              <AiTwotoneCalendar />
              Data de término da vigência: {contrato.data_termino_vigencia}
            </h6>
            <Modal {...contrato} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="text-white  m-4 border-2 border-solid border-white bg-[#117522] p-2 rounded-md hover:bg-white hover:text-[#117522] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Página anterior
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-white  m-4 border-2 border-solid border-white bg-[#117522] p-2 rounded-md hover:bg-white hover:text-[#117522] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Página seguinte
        </button>
      </div>
    </>
  );
}
