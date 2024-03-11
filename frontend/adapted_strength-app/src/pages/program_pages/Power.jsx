/*
Module: Power.jsx
Team: TeraBITE
*/
//import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import programFiller from "../../assets/blank_filler.png"
import { CardBack } from "../../components/Card";
/*
function ClientField() {
    return (<input type="client" placeholder="Client" id="client" name="client" required className="w-4/5 border-b-4 p-0" />);
}
function SpecialtyField() {
    return (<input type="specialty" placeholder="Specialty" id="specialty" name="specialty" required className="w-4/5 border-b-4 p-0" />);
}
*/
export default function BodyBuild() {
    const [showFiveDay, setShowFiveDay] = useState(false);
    const [showFourDay, setShowFourDay] = useState(false);
    const [showThreeDay, setShowThreeDay] = useState(false);
    const [showD1, setShowD1] = useState(false);
    const [showD2, setShowD2]= useState(false);
    const [showD3, setShowD3]= useState(false);
    const [showD4, setShowD4]= useState(false);
    const [showD5, setShowD5]= useState(false);
    const toggleFiveDay = () => {
        setShowFiveDay(!showFiveDay)
    }
    const toggleFourDay = () => {
        setShowFourDay(!showFourDay)
    }
    const toggleThreeDay = () => {
        setShowThreeDay(!showThreeDay)
    }
    const toggleD1 = () => {
        setShowD1(!showD1)
    }
    const toggleD2 = () => {
        setShowD2(!showD2)
    }
    const toggleD3 = () => {
        setShowD3(!showD3)
    }
    const toggleD4 = () => {
        setShowD4(!showD4)
    }
    const toggleD5 = () => {
        setShowD5(!showD5)
    }
    
    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
                YOUR PROGRAM: Powerlifting!
            </p>
            <CardBack>
            <h1 className="font-bold uppercase">
                                March 1 - April 5
                            </h1>
                <button onClick={toggleFiveDay} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold mt-2 px-0 pt-3 pb-3 bg-gray-200">
                    {showFiveDay ? 'Close Program' : 'Show 5-Day'}
                </button>
                {showFiveDay && (
                    <CardBack className={`xl:w-11/12 xl:mx-auto w-full`}>
                        <div className="overflow-x-auto">
                            <button onClick={toggleD1} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD1 ? 'Close' : 'Day 1'}
                            </button>
                            {showD1 && (
                                <table className="w-full text-sm text-center rtl:text-right ">
                                    <tbody className="rounded-full text-[#161A1D]">
                                        <tr>
                                            {/* LET "Order" AND "Exercise" CHANGE! 
                                This is hard coded for UI purposes */}
                                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                                Order
                                            </th>
                                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                                Exercise
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Equipment
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-100">
                                                    Sets
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Reps/Time
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-100">
                                                    % or RPE
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Rest
                                                </td>
                                                <tbody className="text-s rounded-full text-[#161A1D] bg-gray-100">
                                                    {/* LET ALL entries below change.
                                        This is hard coded for UI purposes */}
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        BB
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-100">
                                                        3-4
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        10-12
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-100">
                                                        60
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        2-3 min
                                                    </td>
                                                </tbody>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            <button onClick={toggleD2} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD2 ? 'Close' : 'Day 2'}
                            </button>
                            <button onClick={toggleD3} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD3 ? 'Close' : 'Day 3'}
                            </button>
                            <button onClick={toggleD4} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD4 ? 'Close' : 'Day 4'}
                            </button>
                            <button onClick={toggleD5} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD5 ? 'Close' : 'Day 5'}
                            </button>
                        </div>
                    </CardBack>
                )}


                <button onClick={toggleFourDay} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold mt-2 px-0 pt-3 pb-3 bg-gray-200">
                    {showFourDay ? 'Close Program' : 'Show 4-Day'}
                </button>
                {showFourDay && (
                    <CardBack className={`xl:w-11/12 xl:mx-auto w-full`}>
                        <div className="overflow-x-auto">
                            <button onClick={toggleD1} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD1 ? 'Close' : 'Day 1'}
                            </button>
                            {showD1 && (
                                <table className="w-full text-sm text-center rtl:text-right ">
                                    <tbody className="rounded-full text-[#161A1D]">
                                        <tr>
                                            {/* LET "Order" AND "Exercise" CHANGE! 
                                This is hard coded for UI purposes */}
                                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                                Order
                                            </th>
                                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                                Exercise
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Equipment
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-100">
                                                    Sets
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Reps/Time
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-100">
                                                    % or RPE
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Rest
                                                </td>
                                                <tbody className="text-s rounded-full text-[#161A1D] bg-gray-100">
                                                    {/* LET ALL entries below change.
                                        This is hard coded for UI purposes */}
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        BB
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-100">
                                                        3-4
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        10-12
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-100">
                                                        60
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        2-3 min
                                                    </td>
                                                </tbody>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            <button onClick={toggleD2} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD2 ? 'Close' : 'Day 2'}
                            </button>
                            <button onClick={toggleD3} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD3 ? 'Close' : 'Day 3'}
                            </button>
                            <button onClick={toggleD4} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD4 ? 'Close' : 'Day 4'}
                            </button>
                        </div>
                    </CardBack>
                )}


                <button onClick={toggleThreeDay} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold mt-2 px-0 pt-3 pb-3 bg-gray-200">
                    {showThreeDay ? 'Close Program' : 'Show 3-Day'}
                </button>
                {showThreeDay && (
                    <CardBack className={`xl:w-11/12 xl:mx-auto w-full`}>
                        <div className="overflow-x-auto">
                            <button onClick={toggleD1} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD1 ? 'Close' : 'Day 1'}
                            </button>
                            {showD1 && (
                                <table className="w-full text-sm text-center rtl:text-right ">
                                    <tbody className="rounded-full text-[#161A1D]">
                                        <tr>
                                            {/* LET "Order" AND "Exercise" CHANGE! 
                                This is hard coded for UI purposes */}
                                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                                Order
                                            </th>
                                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                                Exercise
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Equipment
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-100">
                                                    Sets
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Reps/Time
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-100">
                                                    % or RPE
                                                </td>
                                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                                    Rest
                                                </td>
                                                <tbody className="text-s rounded-full text-[#161A1D] bg-gray-100">
                                                    {/* LET ALL entries below change.
                                        This is hard coded for UI purposes */}
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        BB
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-100">
                                                        3-4
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        10-12
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-100">
                                                        60
                                                    </td>
                                                    <td scope="row" className="px-1.5 bg-gray-200">
                                                        2-3 min
                                                    </td>
                                                </tbody>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            <button onClick={toggleD2} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD2 ? 'Close' : 'Day 2'}
                            </button>
                            <button onClick={toggleD3} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
                                {showD3 ? 'Close' : 'Day 3'}
                            </button>
                        </div>
                    </CardBack>
                )}
            </CardBack>
        </div>

    );
}
