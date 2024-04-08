import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { BasicModalDialogue } from '../../components/Dialog';
import LabeledInputField from '../../components/forms/LabeledInputField';

export default function EditProgramsDialog({ programId, programState, className, ...props }) {
        const [programs, setPrograms] = programState;

        const program = programs.find((program) => program.id === programId);
        const nameInput = document.getElementById("edit_program_name_field");
        const descriptionInput = document.getElementById("edit_program_description");
        if (program) {
                nameInput.value = program.name;
                descriptionInput.value = program.description;
        }

        const onEdit = (e) => {
                e.preventDefault();
                const name = document.getElementById("edit_program_name_field").value;
                const description = document.getElementById("edit_program_description").value;

                const newPrograms = programs.map((program) => {
                        if (program.id === programId) {
                                return { ...program, name: name, description: description };
                        }
                        return program;
                });

                setPrograms(newPrograms);

                // clear the form
                document.getElementById("edit_program_name_field").value = "";
                document.getElementById("edit_program_description").value = "";

                document.getElementById("edit-program").classList.add("hidden");
        }
        return (
                <BasicModalDialogue id="edit-program" title={"Edit Program"} className={className} onCloseDialog={props.onClose} {...props}>
                        <form onSubmit={onEdit}>
                                <LabeledInputField id="edit_program_name_field" placeholder="Program Name" required={true} />
                                <div className="py-5">
                                        <label htmlFor="edit_program_description" className="block mb-2 text-sm font-medium text-gray-900 ">Program Description</label>
                                        <textarea id="edit_program_description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Describe this program here..."></textarea>
                                </div>
                                <div className="flex justify-end">
                                        <SecondaryButton onClick={props.onClose} className="mr-2">Cancel</SecondaryButton>
                                        <PrimaryButton type="submit" className="mr-2">Save</PrimaryButton>
                                </div>
                        </form>
                </BasicModalDialogue>
        );
}
