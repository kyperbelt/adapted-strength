import { HttpStatus } from '../../api/ApiUtils';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { BasicModalDialogue } from '../../components/Dialog';
import LabeledInputField from '../../components/forms/LabeledInputField';
import { BasicTextArea } from '../../components/TextArea';
import { ProgrammingApi } from '../../api/ProgrammingApi';

export default function EditBlockDIalog({ blockId, blockState, className, ...props }) {
        const [blocks, setBlocks] = blockState;

        console.log("Blocks: ", blocks);
        const block = blocks.find((block) => block.weekId === blockId);
        console.log("Block: ", block);
        const nameInput = document.getElementById("edit_week_name_field");
                
        console.log("Name input: ", nameInput);
        // const descriptionInput = document.getElementById("edit_week_description");
        if (block) {
                nameInput.value = block.name;
                // descriptionInput.value = block.description || "";
        }

        const onEdit = async (e) => {
                e.preventDefault();
                const name = document.getElementById("edit_week_name_field").value;
                const description = "";
                // const description = document.getElementById("edit_week_description")?.value || block.description;

                const newBlocks = blocks.map((block) => {
                        if (block.weekId === blockId) {
                                return { ...block, name: name, description: description ?? "" };
                        }
                        return block;
                });

                const days = block.days.map((day) => day.dayId);

                await ProgrammingApi.updateWeek({ weekId: block.weekId, weekName: name, weekDescription: description, dayIds: days }).then((r) => {
                        if (r.status === HttpStatus.OK) {
                                console.log("Week updated: ", name, description);
                                return r;
                        } else {
                                throw new Error("Error updating week with status: " + r.status);
                        }
                }).catch((e) => {
                        console.error('Error updating week:', e);
                });

                console.log("New blocks: ", newBlocks);
                setBlocks(newBlocks);

                // clear the form
                document.getElementById("edit_week_name_field").value = "";
                // document.getElementById("edit_program_description").value = "";

                document.getElementById("edit-week").classList.add("hidden");
        }

        return (
                <BasicModalDialogue  title={"Edit Week"} className={className} onCloseDialog={props.onClose} {...props}>
                        <form onSubmit={onEdit} className="space-y-2">
                                <LabeledInputField id="edit_week_name_field" placeholder="Week Name" required={true} />
                                <div className="flex justify-end">
                                        <SecondaryButton onClick={props.onClose} className="mr-2">Cancel</SecondaryButton>
                                        <PrimaryButton type="submit" className="mr-2">Save</PrimaryButton>
                                </div>
                        </form>
                </BasicModalDialogue>
        );

}


                                // <BasicTextArea id="edit_block_description" label="Week Description" placeholder="Describe this week here..." />
                                // <div className="flex justify-end">
                                //         <SecondaryButton onClick={props.onClose} className="mr-2">Cancel</SecondaryButton>
                                //         <PrimaryButton type="submit" className="mr-2">Save</PrimaryButton>
                                // </div>
