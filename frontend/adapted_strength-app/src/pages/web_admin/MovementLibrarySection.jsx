import { VideoApi } from "../../api/VideoApi";
import { TrashIcon, PencilIcon } from "../../components/Icons";
import { useState, useEffect } from "react";
import { CardBack } from "../../components/Card";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import LabeledInputField from "../../components/forms/LabeledInputField";
import { BasicModalDialogue } from "../../components/Dialog";
import { BasicTextArea } from "../../components/TextArea";

export default function MovementLibrarySection() {
  const [movements, setMovements] = useState([]);
  const [editMovement, setEditMovement] = useState(null);
  const [newMovement, setNewMovement] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    VideoApi.getAllMovements()
      .then((data) => {
        setMovements(data);
      })
      .catch((error) => {
        console.error("Error getting movements:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await VideoApi.deleteMovement(id);
      const newMovements = movements.filter((movement) => movement.id !== id);
      setMovements(newMovements);
    } catch (e) {
      console.error("Error deleting movement:", e);
    }
  };

  const handleEdit = async (movement) => {
    setEditMovement(movement);
  };

  const onClose = async () => {

    setEditMovement(null);
  }

  const handleAdd = async () => {
    try {
      const movement = await VideoApi.createVideoInformation(newMovement);
      const newMovements = [...movements];
      newMovements.push(movement);
      setMovements(newMovements);
      setNewMovement({ title: "", description: "", link: "", categories: [] });
      setPreview(null);
    } catch (e) {
      console.error("Error creating movement:", e);
    }
  };

  return (
    <div>
      <CardBack className="mt-4">
        <div className="flex flex-row">
          <div className="w-9/12">
            <h2>Add New Movement</h2>
            <LabeledInputField
              type="text"
              placeholder="Title"
              value={newMovement.title}
              onChange={(e) =>
                setNewMovement({ ...newMovement, title: e.target.value })
              }
            />
            <LabeledInputField
              type="text"
              placeholder="Description"
              value={newMovement.description}
              onChange={(e) =>
                setNewMovement({ ...newMovement, description: e.target.value })
              }
            />
            <LabeledInputField
              type="text"
              placeholder="Link"
              value={newMovement.link}
              onChange={(e) => {
                setNewMovement({ ...newMovement, link: e.target.value });
                const videoId = VideoApi.getVideoId(e.target.value);
                if (videoId) {
                  setPreview(`https://img.youtube.com/vi/${videoId}/1.jpg`);
                } else {
                  setPreview(null);
                }
              }}
            />
            <LabeledInputField
              type="text"
              placeholder="Categories (comma-separated)"
              value={newMovement.categories && newMovement.categories.map((item) => item.category).join(", ")}
              onChange={(e) =>
                setNewMovement({
                  ...newMovement,
                  categories: e.target.value.split(", ").map((item) => {
                    return {
                      category: item.trim()
                    };
                  }),
                })
              }
            />
            <PrimaryButton onClick={handleAdd}>Add Movement</PrimaryButton>
          </div>
          <div className="w-3/12">
            <CardBack className="justify-center text-center">
              <h2>Preview</h2>
              {!preview ? (
                <img src="https://via.placeholder.com/150" alt="placeholder" />
              ) : (
                <img src={preview} alt="preview" />
              )}
            </CardBack>
          </div>
        </div>
      </CardBack>
      <CardBack className="mt-4">
        {movements.map((movement) => (
          <div
            key={movement.id}
            className="flex items-center justify-between p-4 border-b"
          >
            <div className="flex flex-row space-x-3">
              <div className="w-10">{movement.id}</div>
              <h3 className="font-bold">{movement.title + ":"}</h3>
              <p className="truncate text-ellipsis max-w-96">
                {movement.description}
              </p>
              <a className="text-accent hover:text-accent-light" href={movement.link} target="_blank" rel="noopener noreferrer">
                [Youtube]
              </a>
            </div>
            <div>
              <TrashIcon
                className="h-6 w-6 text-accent cursor-pointer"
                onClick={() => handleDelete(movement.id)}
              />
              <PencilIcon
                className="h-6 w-6 text-secondary cursor-pointer"
                onClick={() => handleEdit(movement)}
              />
            </div>
          </div>
        ))}
        <EditMovementDialog onClose={onClose} editMovement={editMovement} movementState={[movements, setMovements]} />
      </CardBack>
    </div>
  );
}

function EditMovementDialog({ editMovement, movementState, ...props }) {

  if (!editMovement) return;

  const [movements, setMovements] = movementState;
  const movementId = editMovement?.id;
  const movement = editMovement;

  const onClose = () => {
    props.onClose();
  }


  const onEdit = async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("web-admin-edit-movement-name");
    const linkInput = document.getElementById("web-admin-edit-movement-link");
    const descriptionInput = document.getElementById("web-admin-edit-movement-description");

    const name = nameInput.value;
    const link = linkInput.value;
    const description = descriptionInput.value;

    const newMovements = movements.map((movement) => {
      if (movement.id === movementId) {
        return { ...movement, title: name, link: link, description: description };
      }
      return movement;
    });

    const editedMovement = newMovements.find((movement) => movement.id === movementId);

    try {
      const movement = await VideoApi.updateVideoInformation(editedMovement);
      // const newMovements = [...movements];
      // newMovements.push(movement);
      setMovements(newMovements);
    } catch (e) {
      console.error("Error creating movement:", e);
    }


    setMovements(newMovements);

    // clear the form
    onClose();
  }

  console.log(movement);
  return (
    <BasicModalDialogue id="web-admin-edit-movement" title={"Edit Movement"} onCloseDialog={onClose} {...props} className="">
      <form onSubmit={onEdit}>
        <LabeledInputField id="web-admin-edit-movement-name" placeholder="Movement Name" required={true} defaultValue={movement.title} />
        <LabeledInputField id="web-admin-edit-movement-link" placeholder="Movement Link" required={true} defaultValue={movement.link} />
        <BasicTextArea id="web-admin-edit-movement-description" label="Movement Description" placeholder="Describe this movement here..." value={movement.description} />
        <div className="flex justify-end">
          <SecondaryButton onClick={onClose} className="mr-2">Cancel</SecondaryButton>
          <PrimaryButton type="submit" className="mr-2">Save</PrimaryButton>
        </div>
      </form>
    </BasicModalDialogue>
  );

}

