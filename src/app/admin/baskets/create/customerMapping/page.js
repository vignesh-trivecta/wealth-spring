'use client';

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { getCustomers } from "@/app/api/basket/route";
import { Button, Modal, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from '@headlessui/react';
import { setBasketBroker } from '@/store/basketSlice'

const CustomerMapping = () => {
    
    // broker inputs 
    const broker = [
        { name: 'AXIS' },
        { name: 'IIFL' },
    ]

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const [ customers, setCustomers ] = useState([]);
    const [weblink, setWeblink] = useState(false);
    const [message, setMessage] = useState(false);
    const [selected, setSelected] = useState(broker[0]);


    const router = useRouter();
    
    // modal state variables
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    const dispatch = useDispatch();

    const handleChange = (selectedItem) => {
        setSelected(selectedItem);
        // Dispatch the value of the selected item to Redux store
        dispatch(setBasketBroker(selectedItem.name));
    };

    useEffect(() => {
        const fetchData = async () => {
          const customersData = await getCustomers();
          setCustomers(customersData);
          console.log(customersData)
        };
      
        fetchData();
    }, []);   
      
    if(weblink){
        setTimeout(() => {
            setWeblink(false);
            router.push("/admin/dashboard");
        }, 3000)
    }

    if(message){
        setTimeout(() => {
            setMessage(false);
            router.push("/admin/dashboard");
        }, 3000)
    }

    return(
       <div className="container">

            <h5 className="font-semibold mb-4">Map basket to a customer</h5>

            {/* Customer Details table */}
            <div className="overflow-x-auto overflow-y-scroll">
                <table className="table-fixed w-full border">
                    <thead className="sticky top-0 border bg-gray-50">
                        <tr>
                            <th scope="col" className="font-medium text-sm p-2">
                                
                            </th>
                            <th scope="col" className="font-medium text-sm text-left p-2">
                                Name
                            </th>
                            <th scope="col" className="font-medium text-sm text-left p-2">
                                Email
                            </th>
                            <th scope="col" className="font-medium text-sm text-left p-2">
                                Contact
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers?.map((data, index) => {
                            return (
                                <tr key={index} className='border hover:bg-gray-50'>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        <input type="radio" name="customer" value={index} id={`customer_${index}`} />
                                    </td>
                                    <td className="text-sm text-left text-black">
                                        {data.name}
                                    </td>
                                    <td className="text-sm text-left text-black">
                                        {data.email}
                                    </td>
                                    <td className="text-sm text-left text-black">
                                        {data.contactOne}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <Button onClick={() => props.setOpenModal('pop-up')}   className='ml-8'>Map to Customer</Button>
                <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className='flex flex-col'>
                            <div className="flex items-center justify-center">
                            <label className='mr-4'>Choose a Broker:</label>
                                <Listbox value={selected} onChange={handleChange} >
                                    <div className=" mt-1">
                                    <Listbox.Button className="w-32 relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-xs">
                                        <span className="block truncate">{selected.name}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            ariaHidden="true"
                                        />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options 
                                        style={{height: '80px'}}
                                        className="absolute mt-1 max-h-32 w-32 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                                        {broker.map((broker, brokerIdx) => (
                                            <Listbox.Option
                                            key={brokerIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-8 pr-4  ${
                                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={broker}
                                            >
                                            {({ selected }) => (
                                                <>
                                                <span
                                                    className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {broker.name}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600">
                                                    <CheckIcon className="h-3 w-3" ariaHidden="true" />
                                                    </span>
                                                ) : null}
                                                </>
                                            )}
                                            </Listbox.Option>
                                        ))}
                                        </Listbox.Options>
                                    </Transition>
                                    </div>
                                </Listbox>
                                </div>
                            <div className="flex items-center justify-center mt-4">
                                <p className="">Do you want to send the WebLink to customer?</p>
                            </div>
                            <div className="flex justify-center mt-10 gap-4">
                            <Button onClick={(e) => {props.setOpenModal(undefined); setWeblink(true)}}>
                                Yes
                            </Button>
                            <Button color="gray" onClick={() => {props.setOpenModal(undefined); setMessage(true)}}>
                                No
                            </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            {
                weblink 
                ?   <Toast className="absolute bottom-0 left-2 bg-green-400">
                        <div className='flex items-center'>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal text-white">
                            Weblink sent successfully! 
                            
                        </div>
                        </div>
                        <Toast.Toggle className='bg-green-400 text-white'/>
                    </Toast>
                :   <></>
            }
            {
                message 
                ?   <Toast className="absolute bottom-0 left-2 bg-green-400">
                        <div className='flex items-center'>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal text-white">
                            Basket mapped successfully! 
                            
                        </div>
                        </div>
                        <Toast.Toggle className='bg-green-400 text-white'/>
                    </Toast>
                :   <></>
            }
        </div>
    );
};

export default CustomerMapping;