import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { BasicModalDialogue } from '../../components/Dialog';
import LabeledInputField from '../../components/forms/LabeledInputField';
import { BasicTextArea } from '../../components/TextArea';

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
                                <BasicTextArea id="edit_program_description" label="Program Description" placeholder="Describe this program here..." />
                                <div className="flex justify-end">
                                        <SecondaryButton onClick={props.onClose} className="mr-2">Cancel</SecondaryButton>
                                        <PrimaryButton type="submit" className="mr-2">Save</PrimaryButton>
                                </div>
                        </form>
                </BasicModalDialogue>
        );
}
