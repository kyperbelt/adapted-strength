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
const programFiller=[
    {
        id:1,
        order: "A",
        movement: "Bench Press",
        open: false,
        selected: false,
        blocks: []
    }
]
const VIEW_TYPE_MOVEMENT = "Movement"
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
                        <tbody className="rounded-full text-[#161A1D] bg-gray-300">
                            <tr>
                                <th scope="col" className="px-1.5 py-1">
                                    Order
                                </th>
                                <th scope="col" className="px-1.5 py-1">
                                    Exercise
                                    <td scope="col" className="px-1.5 text-xs">
                                        Equipment
                                    </td>
                                    <td scope="col" className="px-1.5 text-xs">
                                        Sets
                                    </td>
                                    <td scope="col" className="px-1.5 text-xs">
                                        Reps/Time
                                    </td>
                                    <td scope="col" className="px-1.5 text-xs">
                                        % or RPE
                                    </td>
                                    <td scope="col" className="px-1.5 text-xs">
                                        Rest
                                    </td>
                                    <tbody className="text-s border-solid rounded-full text-[#161A1D] bg-gray-100">
                                        <td scope="row" className="px-1.5">
                                            BB
                                        </td>
                                        <td scope="row" className="px-1.5">
                                            3-4
                                        </td>
                                        <td scope="row" className="px-1.5">
                                            10-12
                                        </td>
                                        <td scope="row" className="px-1.5">
                                            60
                                        </td>
                                        <td scope="row" className="px-1.5">
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
