'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useCallback, useState, useMemo } from 'react';
import { proposeBet } from '../utils/api';
import { REM } from 'next/font/google';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';


const rem = REM({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

function ProposeBetButton() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('social');
  const [options, setOptions] = useState(['', '']);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOptionField = () => {
    setOptions([...options, '']);
  };

  const validOptions = useMemo(
    () => options.filter((opt) => opt.trim() !== ''),
    [options]
  );

  const isFormValid = useMemo(() => {
    return (
      title.trim().length > 0 &&
      category.trim().length > 0 &&
      validOptions.length >= 2
    );
  }, [title, category, validOptions]);

  const handlePropose = useCallback(async () => {
    if (!isFormValid || !address) {
      return;
    }

    const nonce = Math.random().toString(36).substring(2, 10);
    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in to propose a bet',
      uri: window.location.origin,
      version: '1',
      chainId: 1,
      nonce,
      issuedAt: new Date().toISOString(),
    });

    const message = siweMessage.prepareMessage();

    try {
      const signature = await signMessageAsync({ message });

      const proposed = await proposeBet({
        message,
        signature,
        title,
        description,
        category,
        options: validOptions,
      });

      alert('Propuesta ingresada! ID: ' + proposed.id);
      closeModal();
      setTitle('');
      setDescription('');
      setCategory('social');
      setOptions(['', '']);
    } catch (err) {
      alert('Error al proponer apuesta: ' + (err as Error).message);
    }
  }, [address, signMessageAsync, isFormValid, title, description, category, validOptions]);

  return (
    <>
      <button
        onClick={openModal}
        className={`${rem.className} text-left inline-flex pl-5 pr-10 cursor-pointer py-4  rounded-full leading-none font-black text-2xl text-[#2F7068] bg-[#FFFFFF] transition-shadow duration-300 hover:shadow-[0_0_20px_10px_rgba(255,174,74,0.5)]`}
      >
        <img src="/shine.svg" alt="Estrella" className="w-12 h-12"/>PROPONER<br />APUESTA
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Fondo opaco animado */}
            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0  backdrop-blur-sm" />
            </Transition.Child>

            {/* Modal panel animado */}
            <Transition.Child
              as={Fragment}
              enter="transition-all duration-300 ease-out"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all duration-200 ease-in"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 z-10">
                <Dialog.Title className="text-xl font-bold">Proponer Apuesta</Dialog.Title>

                    <div className="">
                      {/* Formulario */}
                      <div className="">
                        <label className="block">
                          <span className="text-sm font-medium">Título</span>
                          <input
                            placeholder="¿Qué sucederá con...?"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full mt-1 p-2 border rounded-md`}
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium">Descripción</span>
                          <textarea
                            placeholder="Agrega más contexto, fechas, condiciones, etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium">Categoría</span>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md"
                          >
                            <option value="social">Social</option>
                            <option value="política">Política</option>
                            <option value="economía">Economía</option>
                          </select>
                        </label>

                        <div>
                          <span className="text-sm font-medium">Opciones</span>
                          {options.map((opt, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={opt}
                              onChange={(e) => handleOptionChange(idx, e.target.value)}
                              className={`w-full mt-1 mb-1 p-2 border rounded-md`}
                              placeholder={`Opción ${idx + 1}`}
                            />
                          ))}
                          <button
                            onClick={addOptionField}
                            type="button"
                            className="text-sm text-blue-600 hover:underline mt-1"
                          >
                            + Añadir opción
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handlePropose}
                        disabled={!isFormValid}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                          isFormValid
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        Enviar propuesta
                      </button>
                    </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ProposeBetButton;
