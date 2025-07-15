'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { proposeBet } from '../utils/api';
import { REM } from 'next/font/google';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);
  const [showRequirementsWarning, setShowRequirementsWarning] = useState(false);

  const openModal = () => {
    if (!address) {
      setIsConnectWalletOpen(true);
      return;
    }
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOptionField = () => {
    setOptions([...options, '']);
  };

  const removeOptionField = (index: number) => {
    const updated = options.filter((_, idx) => idx !== index);
    setOptions(updated);
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
      console.log("HELLO");
      setShowRequirementsWarning(true);
      return;
    }
    setShowRequirementsWarning(false);
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

    const preparedMessage = siweMessage.prepareMessage();

    try {
      const signature = await signMessageAsync({message: preparedMessage});

      const proposed = await proposeBet({
        message: preparedMessage,
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

  useEffect(() => {
    if (isFormValid) {
      setShowRequirementsWarning(false);
    }
  }, [isFormValid]);

  const connectButtonRef = useRef<any>(null);

  const [showTakeMeThere, setShowTakeMeThere] = useState(false);
  useEffect(() => {
    if (address && isConnectWalletOpen) {
      // Cuando se conecta la wallet, muestra el botón "Llévame ahí"
      setShowTakeMeThere(true);
    }
  }, [address, isConnectWalletOpen]);
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
              <Dialog.Panel className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 z-10" as={motion.div} layout>
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
                            className="w-full mt-1 p-2 border rounded-md cursor-pointer"
                          >
                            <option value="social">Social</option>
                            <option value="política">Política</option>
                            <option value="economía">Economía</option>
                          </select>
                        </label>

                        <div>
                          <span className="text-sm font-medium">Opciones</span>
                          <AnimatePresence>
                            {options.map((opt, idx) => (
                              <motion.div
                                key={idx}
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.25 }}
                                className="relative mt-1 mb-1"
                              >
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                                  className="w-full p-2 pr-8 border rounded-md"
                                  placeholder={`Opción ${idx + 1}`}
                                />
                                {idx >= 2 && (
                                  <button
                                    type="button"
                                    onClick={() => removeOptionField(idx)}
                                    className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-sm"
                                    title="Eliminar opción"
                                  >
                                    ✕
                                  </button>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>

                          <button
                            onClick={addOptionField}
                            type="button"
                            className="text-sm text-blue-600 hover:underline mt-1 cursor-pointer"
                          >
                            + Añadir opción
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {showRequirementsWarning && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-sm text-red-600"
                        >
                          ⚠️ Para proponer una apuesta debes ingresar un título, seleccionar una categoría e ingresar al menos dos opciones válidas.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handlePropose}
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
      <Transition show={isConnectWalletOpen} as={Fragment}>
        <Dialog onClose={() => setIsConnectWalletOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 backdrop-blur-sm" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition-all duration-300 ease-out"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all duration-200 ease-in"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10 text-center">
                <Dialog.Title className="text-xl font-bold mb-2">
                  {showTakeMeThere ? '¡Wallet conectada!' : 'Conecta tu billetera'}
                </Dialog.Title> 

                <p className="text-sm mb-4">
                  {showTakeMeThere
                    ? '¡Perfecto! Ya estás conectado. Puedes continuar y proponer tu apuesta.'
                    : 'Necesitas conectar tu wallet para proponer una apuesta.'}
                </p>

                {!showTakeMeThere ? (
                  <div className='flex justify-center'>
                    <appkit-button label="Conecta tu Wallet" loadingLabel="Conectando" />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsConnectWalletOpen(false);
                      setIsOpen(true);
                      setShowTakeMeThere(false); // resetea estado
                    }}
                    className="mt-4 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer"
                  >
                    Llévame ahí
                  </button>
                )}
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ProposeBetButton;
