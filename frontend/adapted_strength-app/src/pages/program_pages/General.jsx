/*
Module: General.jsx
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

export default function General() {
    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
                YOUR PROGRAM: General Strength!
            </p>

            <CardBack className={`rounded xl:w-11/12 xl:mx-auto w-full`}>
                <div className="relative overflow-x-auto">
                    <h1 className="font-bold uppercase rounded-full bg-gray-100">
                        March 1 - April 5
                    </h1>
                    <table className="w-full text-sm text-center rtl:text-right ">
                        <thead className="text-s rounded-full text-gray-700 bg-gray-50 dark:bg-gray-100 dark:text-[#161A1D]">
                            <tr>
                                <th scope="col" className="px-1.5 py-1">
                                    Type
                                </th>
                                <th scope="col" className="px-1.5 py-1">
                                    Exercise
                                </th>
                                <th scope="col" className="px-1.5 py-1">
                                    Sets x Reps
                                </th>
                                <th scope="col" className="px-1.5 py-1">
                                    % or RPE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td scope="row" className="px-1.5 py-1">
                                    Hypertrophy
                                </td>
                                <td className="px-1.5 py-1">
                                    L-H Chest Flies
                                </td>
                                <td className="px-1.5 py-1">
                                    4 x (8-10)
                                </td>
                                <td className="px-1.5 py-1">
                                    9
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td scope="row" className="px-1.5 py-1">
                                    Hypertrophy
                                </td>
                                <td className="px-1.5 py-1">
                                    Bench
                                </td>
                                <td className="px-1.5 py-1">
                                    4 x (8-10)
                                </td>
                                <td className="px-1.5 py-1">
                                    60%
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td scope="row" className="px-1.5 py-1">
                                    Hypertrophy
                                </td>
                                <td className="px-1.5 py-1">
                                    H-L Chest Flies
                                </td>
                                <td className="px-1.5 py-1">
                                    4 x (10-12)
                                </td>
                                <td className="px-1.5 py-1">
                                    9
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td scope="row" className="px-1.5 py-1">
                                    Hypertrophy
                                </td>
                                <td className="px-1.5 py-1">
                                    30 degree Bench Press
                                </td>
                                <td className="px-1.5 py-1">
                                    (3-4) x (10-12)
                                </td>
                                <td className="px-1.5 py-1">
                                    9
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td scope="row" className="px-1.5 py-1">
                                    Hypertrophy
                                </td>
                                <td className="px-1.5 py-1">
                                    Tricep pull
                                </td>
                                <td className="px-1.5 py-1">
                                    (3-4) x (10-12)
                                </td>
                                <td className="px-1.5 py-1">
                                    9
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardBack>
        </div>

    );
}
