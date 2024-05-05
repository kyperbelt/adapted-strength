import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { CardBack } from "../../components/Card";
import EditProgramsDialog from "./EditProgramDialog";
import { StyledCheckboxTable, CustomTableRow, SearchBar } from "./Tables";

import { useState } from "react";
import EditBlockDIalog from "./EditBlockDialog";

export default function BlockDashboard({ programBlocks, onAddBlock, ...props }) {
        const [blocks, setBlocks] = useState(programBlocks);
        const [blockEditId, setEditBlockId] = useState(null);


        const DeleteBlock = (blocksToDelete) => {

                const newBlocks = blocks.filter((block) => !blocksToDelete.includes(block));
                setBlocks(newBlocks);
        }

        const OptionSelected = (option) => {
                if (option === 'Delete Selected') {
                        const blocksToDelete = blocks.filter((block) => block.selected);
                        console.log(`Delete Selected so im deleting ${blocksToDelete.length} blocks`);
                        DeleteBlock(blocksToDelete);
                }
        }

        const onAllSelected = (selected) => {
                console.log(`All selected: ${selected}`);
                const newBlocks = blocks.map((block) => {
                        return { ...block, selected };
                });
                setBlocks(newBlocks);
        }

        return (

                <div className="flex flex-col px-6">
                        <h3 className="text-3xl font-bold text-secondary-light">Blocks</h3>
                        <CardBack className="">
                                <div className="flex flex-col sm:flex-row mt-2">

                                        <SearchBar />
                                        <PrimaryButton
                                                className="sm:ml-auto w-32"
                                                onClick={onAddBlock}>
                                                Add Block
                                        </PrimaryButton>
                                </div>
                                <StyledCheckboxTable headers={["Name", "Description"]} onAllSelected={onAllSelected} onOptionsClick={OptionSelected}>
                                        {blocks.map((block) => (
                                                <CustomTableRow
                                                        key={block.id}
                                                        data={[
                                                                block.name,
                                                                block.description,
                                                        ]}
                                                        onOptionClick={(option) => {
                                                                if (option === 'Delete') {
                                                                        DeleteBlock([block]);
                                                                } else if (option === 'Edit') {
                                                                        document.getElementById("edit-block").classList.remove("hidden");
                                                                        setEditBlockId(block.id);
                                                                }
                                                        }}
                                                        selected={block.selected}
                                                        onClick={() => {
                                                                const newBlocks = blocks.map((b) => {
                                                                        if (b.id === block.id) {
                                                                                return { ...b, selected: !b.selected };
                                                                        }
                                                                        return b;
                                                                });
                                                                setBlocks(newBlocks);
                                                                console.log(`Block ${block.id} selected: ${block.selected}`);
                                                        }}
                                                />
                                        ))}
                                </StyledCheckboxTable>
                        </CardBack>
                        <EditBlockDIalog blockId={blockEditId} blockState={[blocks, setBlocks]} id="edit-block" className="hidden" title="Edit Block" onClose={() => { document.getElementById("edit-block").classList.add("hidden") }} />

                </div>
        );
}
