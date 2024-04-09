import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { BasicModalDialogue } from '../../components/Dialog';
import LabeledInputField from '../../components/forms/LabeledInputField';
import { BasicTextArea } from '../../components/TextArea';

export default function EditBlockDIalog({ blockId, blockState, className, ...props }) {
        const [blocks, setBlocks] = blockState;

        const block = blocks.find((block) => block.id === block);
        const nameInput = document.getElementById("edit_block_name_field");
        const descriptionInput = document.getElementById("edit_block_description");
        if (block) {
                nameInput.value = block.name;
                descriptionInput.value = block.description;
        }

        const onEdit = (e) => {
                e.preventDefault();
                const name = document.getElementById("edit_program_name_field").value;
                const description = document.getElementById("edit_program_description").value;

                const newPrograms = blocks.map((block) => {
                        if (block.id === blockId) {
                                return { ...block, name: name, description: description };
                        }
                        return block;
                });

                setBlocks(newPrograms);

                // clear the form
                document.getElementById("edit_program_name_field").value = "";
                document.getElementById("edit_program_description").value = "";

                document.getElementById("edit-block").classList.add("hidden");
        }
        return (
                <BasicModalDialogue id="edit-block" title={"Edit Block"} className={className} onCloseDialog={props.onClose} {...props}>
                        <form onSubmit={onEdit}>
                                <LabeledInputField id="edit_block_name_field" placeholder="Block Name" required={true} />
                                <BasicTextArea id="edit_block_description" label="Block Description" placeholder="Describe this program here..." />
                                <div className="flex justify-end">
                                        <SecondaryButton onClick={props.onClose} className="mr-2">Cancel</SecondaryButton>
                                        <PrimaryButton type="submit" className="mr-2">Save</PrimaryButton>
                                </div>
                        </form>
                </BasicModalDialogue>
        );
}
