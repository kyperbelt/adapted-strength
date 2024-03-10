/*
Module: BodyBuild.jsx
Team: TeraBITE
*/
//import { Outlet, Link } from "react-router-dom";
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
    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
                YOUR PROGRAM: Body Building and Aesthetic Strength!
            </p>
            <CardBack className={`xl:w-11/12 xl:mx-auto w-full`}>
                <div className="overflow-x-auto">
                    <h1 className="font-bold uppercase bg-gray-100">
                        March 1 - April 5
                    </h1>
                    <table className="w-full text-sm text-center rtl:text-right ">
                        <tbody className="rounded-full text-[#161A1D]">
                            <tr>
                                {/* LET "Order" AND "Exercise" CHANGE! 
                                This is hard coded for UI purposes */}
                                <th scope="col" className="px-1.5 py-1 bg-gray-300">
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
                </div>
            </CardBack>
        </div>

    );
}
