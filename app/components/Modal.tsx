'use client';

import { useEffect, useState } from 'react';
import { Contrato } from '../@types';
import { createPortal } from 'react-dom';
import { AiOutlineAudit, AiOutlineCloseCircle, AiOutlineDollar, AiTwotoneCalendar } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

type Props = Contrato;

export default function Modal(props: Props) {
  const {
    objeto,
    modalidade_licitacao,
    codigo_contrato,
    data_assinatura,
    origem_licitacao,
    data_inicio_vigencia,
    data_termino_vigencia,
    valor_inicial,

    _links,
  } = props;

  const [isOpened, setisOpened] = useState(false);
  const [body, setBody] = useState(null as null | HTMLElement);

  useEffect(() => {
    const body = document.body;
    setBody(body);
  }, [body]);

  if (!body) return null;

  return (
    <>
      {isOpened &&
        createPortal(
          <main className="fixed bg-black/50 z-10 inset-0 flex items-center justify-center backdrop-blur-sm">
            <AnimatePresence>
              <motion.div
                initial={{ y: 700 }}
                animate={{ y: 0 }}
                className="flex flex-col gap-8 z-10 bg-white w-full max-w-3xl h-[90%] rounded-lg shadow-xl relative sm:m-10 overflow-y-scroll  "
              >
                <AiOutlineCloseCircle
                  className="absolute top-0 text-[#117522] cursor-pointer right-0 z-11 text-3xl"
                  onClick={() => setisOpened(!isOpened)}
                />
                <img src="/Logo-Governo.png" alt="" className="  self-center m-4 w-[50%] min-w-[100px] " />
                <h1 className="sm:text-2xl font-bold text-center">{objeto}</h1>
                <h2 className="sm:text-lg font-bold text-center"> COD: {codigo_contrato}</h2>
                <h2 className="sm:text-lg flex items-center gap-2 justify-center text-[#117522]">
                  <AiTwotoneCalendar />
                  Datas
                </h2>
                <ul className="flex flex-col justify-center">
                  <li className="text-center md:text-sm">Data da assinatura: {data_assinatura}</li>
                  <li className="text-center md:text-sm">Data do inicio da vigência: {data_inicio_vigencia}</li>
                  <li className="text-center md:text-sm">Data do término da vigência: {data_termino_vigencia}</li>
                </ul>
                <h2 className="sm:text-lg flex items-center gap-2 justify-center text-[#117522]">
                  <AiOutlineAudit /> Licitação
                </h2>
                <ul className="flex flex-col justify-center">
                  <li className="text-center md:text-sm">Origem: {origem_licitacao}</li>
                  <li className="text-center md:text-sm">Modalidade: {modalidade_licitacao}</li>
                </ul>
                <h2 className="sm:text-lg flex items-center gap-2 justify-center text-[#117522]">
                  <AiOutlineDollar />
                  Valores
                </h2>
                <ul className="flex flex-col justify-center">
                  <li className="text-center text-sm">Valor inicial: R$ {valor_inicial}</li>
                </ul>
                <h2 className="text-sm flex items-center gap-2 justify-center font-bold">Mais informações </h2>
                <div className="flex justify-center flex-wrap mb-10">
                  <a className="text-[#117522] rounded-md sm:m-3 cursor-pointer text-sm">{_links.aditivos.title}</a>
                  <a className="text-[#117522] rounded-md sm:m-3 cursor-pointer text-sm">
                    {_links.apostilamentos.title}
                  </a>
                  <a className="text-[#117522] rounded-md sm:m-3 mt-3 cursor-pointer text-sm">{_links.eventos.title}</a>
                  <a className="text-[#117522] rounded-md sm:m-3 mt-3 cursor-pointer text-sm">
                    {_links.licitacao.title}
                  </a>
                  <a className="text-[#117522] rounded-md sm:m-3 cursor-pointer text-sm">
                    {_links.tipo_contrato.title}
                  </a>
                  <a className="text-[#117522] rounded-md sm:m-3 cursor-pointer text-sm">
                    {_links.modalidade_licitacao.title}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>,
          body
        )}
      {!isOpened && (
        <button onClick={() => setisOpened(!isOpened)} className="text-white bg-[#117522] rounded-md w-[30%] m-3 ">
          Ver mais
        </button>
      )}
    </>
  );
}
