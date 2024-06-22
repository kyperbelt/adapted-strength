import { BasicTextArea } from "../../components/TextArea";
import { PrimaryButton } from "../../components/Button";
import { WebAdminApi } from "../../api/WebAdminApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FrontPageSection from "./FrontPageSection";
import MovementLibrarySection from "./MovementLibrarySection";

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

