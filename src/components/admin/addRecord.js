'use client';

import React, { useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import SearchDropdown from '@/utils/searchDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Weightage from '@/utils/weightage';
import Table from './Table';

const AddRecord = () => {

    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };

    const dispatch = useDispatch();
    const selectedStock = useSelector((state) => state.data.selectedStock);

    const [exchange, setExchange] = useState("");
    const [orderType, setOrderType] = useState("");
    const [record, setRecord] = useState({
        instrumentName: "",
        exchange: "",
        weightage: "",
        orderType: "",
        quantity: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setRecord({
            instrumentName: selectedStock,
            exchange: exchange,
            weightage: weightage,
            orderType: orderType,
            quantity: "",
        })
        // need to make the api call here
        // by removing setRecord or can use directly
        // the response received needs to be mapped to Table
    }


    return (
    <div className='container mx-atuo my-8'>
        <Table record={record} />
        <div className='h-12'>
            <div>
                <Button onClick={() => props.setOpenModal('form-elements')}>Add Record</Button>
                <Modal show={props.openModal === 'form-elements'}  popup onClose={() => props.setOpenModal(undefined)}>
                    <Modal.Header />
                    <Modal.Body>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-10">Add new record</h3>
                        <div className='grid grid-rows-4 grid-cols-3 gap-x- gap-y-4'>
                                <Label htmlFor="stock" value="Stock" className='text-md' />
                                <div className=''>
                                    <SearchDropdown id="stock" />
                                </div>

                                <div className='col-start-3 row-start-1 flex flex-col ml-8'>
                                    <Label htmlFor="price" value="Price" className='' />
                                    <input disabled id='price' name="price" type="number" className='w-full bg-gray-200 rounded-md border border-gray-200' />
                                </div>

                                <Label value="Exchange" className='col-start-1 row-start-2 text-md' />
                                <div className=' col-start-2 row-start-2'>
                                    <input id="bse" name="exchange" type='radio' value="BSE" onChange={() => setExchange("BSE")} />
                                    <label htmlFor='bse' className='ml-1'>BSE</label>
                                    <input id="nse" name="exchange" type='radio' value="NSE" className='ml-1' onChange={() => setExchange("NSE")} />
                                    <label htmlFor='nse' className='ml-1'>NSE</label>
                                </div>

                                <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-md' />
                                <div className='rounded-md col-start-2 row-start-3 h-10'>
                                    <Weightage />
                                </div>

                                <Label value="Order Type" className='col-start-1 row-start-4 text-md'/>
                                <div className='col-start-2'>
                                    <input id="buy" name="orderType" type='radio' value="Buy" onChange={() => setOrderType("Buy")} />
                                    <label htmlFor='buy' className='ml-1'>BUY</label>
                                    <input id="sell" name="orderType" type='radio' value="Sell" className='ml-1' onChange={() => setOrderType("Sell")} />
                                    <label htmlFor='sell' className='ml-1'>SELL</label>
                                </div>

                                <div className='col-start-3 row-start-3 flex flex-col ml-8'>
                                    <Label htmlFor='quantity' value="Quantity" />
                                    <input disabled id='quantity' name='quantity' type="number" className='w-full bg-gray-200 border border-gray-200 rounded-md' />
                                </div>


                        </div>
                        <div className="flex justify-center mt-4">
                            <button type='submit' onClick={handleSubmit} className='border bg-cyan-800 rounded-md p-2 text-white hover:bg-cyan-700'>Submit</button>
                            <button type='button' onClick={() => props.setOpenModal(undefined)} className='border p-2 border-gray-400 rounded-md ml-4 hover:bg-orange-500 hover:text-white hover:border-orange-500'>Close</button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    </div>
    )
}

export default AddRecord