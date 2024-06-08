import { PageContainer2 } from "../components/PageContainer";
import { useState, useEffect } from "react";
import { VideoApi } from "../api/VideoApi";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function MovementLibrary() {
  const nav = useNavigate();
  const loc = useLocation();
  const url = loc.pathname;
  const { movementId } = useParams();
  const [movements, setMovements] = useState([]);
  const [selectedMovement, setSelectedMovement] = useState(null);

  const getSelectedMovement = (id, movements) => {
    return movements.find((movement) => movement.id == id);
  };

  useEffect(() => {
    VideoApi.getAllMovements()
      .then((data) => {
        console.log(data);
        setMovements(data);

        if (movementId) {
          const movement = getSelectedMovement(movementId, data);
          console.log("SELECTED MOVEMENT:", movement);
          console.log("MOVEMENTID:", movementId, "TYPE:", typeof movementId);
          setSelectedMovement(movement);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movementId]);

  const closeModal = () => {
    setSelectedMovement(null);
    nav(-1);
  };

  return (
    <PageContainer2>
      <h1 className="relative text-4xl font-bold mb-8 bottom-14 text-center">
        Movement Library
      </h1>
      <div className="pl-3 lg:pl-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3">
        {movements.map((movement, index) => (
          <VideoCard key={index} movement={movement} />
        ))}
      </div>
      {selectedMovement && (
        <div className="fixed inset-0 bg-white z-20">
          <div className="absolute flex flex-row items-center bg-black right-0 top-0 justify-end p-3.5">
            <button
              className="bg-white hover:bg-accent p-2 rounded-2xl top-4 z-30"
              onClick={(e)=>{
                e.stopPropagation();
                closeModal();
              }}
            >
              Back
            </button>
          </div>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${VideoApi.getVideoId(
              selectedMovement.link
            )}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </PageContainer2>
  );
}

function VideoCard({ movement }) {
  const nav = useNavigate();

  console.log("MOVEMENT:", movement);

  return (
    <div className="w-full bg-white border border-gray-200 hover:bg-primary-dark hover:border-accent rounded-lg shadow">
      <div
        onClick={() => {
          nav(`/movement-library/${movement.id}`);
        }}
        className="w-full cursor-pointer"
      >
        <img
          className="rounded-t-lg w-full"
          src={`https://img.youtube.com/vi/${VideoApi.getVideoId(
            movement.link
          )}/1.jpg`}
          alt={movement.title}
        />
      </div>

      <div className="flex flex-wrap pt-2 pl-2">
        {movement.categories.map((category, index) => (
          <span
            key={index + `${category.category}`}
            className="bg-accent rounded-full px-3 mt-1 py-0 text-sm font-semibold text-primary me-2 cursor-pointer hover:bg-primary hover:text-primary-dark"
          >
            #{category.category}
          </span>
        ))}
      </div>
      <div className="p-5">
        <div
          onClick={() => {
            nav(`/movement-library/${movement.id}`);
          }}
          className="cursor-pointer"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {movement.title}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700">{movement.description}</p>
      </div>
    </div>
  );
}

// <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
//   <div className="h-64 bg-gray-200 rounded-lg">
//     <img
//       src={`https://img.youtube.com/vi/${getVideoId(movement.link)}/1.jpg`}
//
//       alt={movement.title}
//       className="w-full h-full object-cover"
//     />
//     <div className="text-white h-32">hey</div>
//     {movement.categories.map((category, index) => (
//       <span
//         key={index + `${category.category}`}
//         className="bg-accent rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
//       >
//         #{category.category} sup
//       </span>
//     ))}
//   </div>
//   <h2 className="mt-4 text-lg font-semibold">{movement.title}</h2>
//   <div className="mt-2">
//   </div>
// </div>
