import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { BasicModalDialogue } from '../../components/Dialog';
import LabeledInputField from '../../components/forms/LabeledInputField';

export default function CreateProgramDialog({onCreate, className, ...props }) {

        const onCreateHandler = (e) => {
                e.preventDefault();
                const name = document.getElementById("program_name_field").value;
                const description = document.getElementById("program_description").value;
                if (onCreate) {
                        onCreate(name, description);
                }else{
                        window.alert(`Unable to create program ${name}. Because onCreate is not defined for CreateProgramDialog.`);
                }
                // clear the form
                document.getElementById("program_name_field").value = "";
                document.getElementById("program_description").value = "";

                props.onClose();
        }

        return (
                <BasicModalDialogue title={props.title} className={className} onCloseDialog={props.onClose} {...props}>
                        <form onSubmit={onCreateHandler}>
                                <LabeledInputField id="program_name_field" placeholder="Program Name" required={true} />
                                <div className="py-5">
                                        <label htmlFor="program_description" className="block mb-2 text-sm font-medium text-gray-900 ">Program Description</label>
                                        <textarea id="program_description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Describe this program here..."></textarea>
                                </div>
                                <div className="flex justify-end">
                                        <SecondaryButton onClick={props.onClose} className="mr-2">Cancel</SecondaryButton>
                                        <PrimaryButton type="submit" className="mr-2">Create</PrimaryButton>
                                </div>
                        </form>
                </BasicModalDialogue>
        );
}
