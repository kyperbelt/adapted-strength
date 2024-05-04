import { BasicTextArea } from "../../components/TextArea";
import { PrimaryButton } from "../../components/Button";
import { WebAdminApi } from "../../api/WebAdminApi";
import { CardBack } from "../../components/Card";
import LabeledInputField from "../../components/forms/LabeledInputField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VideoApi } from "../../api/VideoApi";
import { IconButton } from "../../components/Button";
import { TrashIcon, PencilIcon } from "../../components/Icons";

const showdown = window.showdown;

export default function WebAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("termsOfService");
  const [content, setContent] = useState(null);
  useEffect(() => {
    WebAdminApi.getContentFull()
      .then((data) => {
        setContent(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error getting content:", error);
        navigate("/login", {});
      });
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">WebAdmin</h1>
      <div className="mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "termsOfService" ? "bg-accent text-white" : "bg-white"
            }`}
          onClick={() => setActiveTab("termsOfService")}
        >
          Terms of Service
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "aboutUs" ? "bg-accent text-white" : "bg-white"
            }`}
          onClick={() => setActiveTab("aboutUs")}
        >
          About Us
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "movementLibrary"
            ? "bg-accent text-white"
            : "bg-white"
            }`}
          onClick={() => setActiveTab("movementLibrary")}
        >
          Movement Library
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "frontPage" ? "bg-accent text-white" : "bg-white"
            }`}
          onClick={() => setActiveTab("frontPage")}
        >
          Front Page
        </button>
      </div>
      {activeTab === "termsOfService" && (
        <TermsOfServiceSection content={content} />
      )}
      {activeTab === "aboutUs" && <AboutUsSection content={content} />}
      {activeTab === "movementLibrary" && <MovementLibrarySection />}
      {activeTab === "frontPage" && <FrontPageSection content={content} />}
    </div>
  );
}

function FrontPageSection({ content }) {
  return (
    <div>
      <h2>Front Page</h2>
    </div>
  );
}

function MovementLibrarySection() {
  const [movements, setMovements] = useState([]);
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
    // Add your delete logic here
    try {
      await VideoApi.deleteMovement(id);
      const newMovements = movements.filter((movement) => movement.id !== id);
      setMovements(newMovements);
    } catch (e) {
      console.error("Error deleting movement:", e);
    }
  };

  const handleEdit = (movement) => {
    // Add your edit logic here
  };

  const handleAdd = async () => {
    // Add your add logic here
    try {
      const movement = await VideoApi.createVideoInformation(newMovement);
      const newMovements = [...movements];
      newMovements.push(movement);
      setMovements(newMovements);
      setNewMovement({ title: "", description: "", link: "", categories: []});
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
              <h3 className="font-bold">{movement.title + ":"}</h3>
              <p className="truncate text-ellipsis max-w-96">
                {movement.description}
              </p>
              <a href={movement.link} target="_blank" rel="noopener noreferrer">
                Link
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
      </CardBack>
    </div>
  );
}

function AboutUsSection({ content }) {
  return (
    <div>
      <h2>About Us</h2>
    </div>
  );
}

function TermsOfServiceSection({ content }) {
  const [termsOfService, setTermsOfService] = useState(content.termsOfService);

  var converter = new showdown.Converter();

  const onSaveTermsOfService = async () => {
    delete termsOfService.id;
    termsOfService.content = document.getElementById("termsOfService").value;
    try {
      const response = await WebAdminApi.createTermsOfService(termsOfService);
      console.log(response);
    } catch (error) {
      console.error("Error creating terms of service:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-0">
      <BasicTextArea
        id="termsOfService"
        label="Terms of Service"
        value={termsOfService.content}
        placeholder=""
        rows={4}
        cols={50}
      />
      <div className="flex justify-end">
        <PrimaryButton text="Save" onClick={onSaveTermsOfService}>
          Save
        </PrimaryButton>
      </div>

      <div className="prose px-6">
        <span
          id="termsOfServicePreview"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(termsOfService.content),
          }}
        ></span>
      </div>
    </div>
  );
}

