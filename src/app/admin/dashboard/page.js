'use client';
import { PieChart } from "@/components/admin/piechart";
import React from "react";

const DashCards = () => {
    return(
        <div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-20">
                <div className="bg-white border-2 border-gray-300 rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl leading-none font-bold text-gray-900">2,340</span>
                            <h3 className="text-base font-normal text-gray-500">Total number of transactions</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white  border-2 border-gray-300 rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl leading-none font-bold text-gray-900">55</span>
                            <h3 className="text-base font-normal text-gray-500">Total number of baskets executed</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white  border-2 border-gray-300 rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl leading-none font-bold text-gray-900">50,00,000</span>
                            <h3 className="text-base font-normal text-gray-500">Total value of orders</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <PieChart />
            </div> */}
        </div>
    )
}

export default DashCards;