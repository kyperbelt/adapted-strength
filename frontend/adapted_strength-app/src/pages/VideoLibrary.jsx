import React from 'react';
import ReactPlayer from 'react-player'
import PageContainer1 from "../components/PageContainer"
import { useState } from "react"; // removed "usedEffect, as code did not reference use" [12-FEB-2024]
import { VideoApi } from "../api/VideoApi";
import LabeledInputField from "../components/forms/LabeledInputField";

const testVideos = [
    {
    "title": "Test 1",
    "description": "Description for Test 1",
    "category": "category 1",
    "link": "https://www.youtube.com/watch?v=MukcBRaHHmc"
    },
    {
    "title": "Test 2",
    "description": "Description for Test 2",
    "category": "category 2",
    "link": "https://www.youtube.com/watch?v=MukcBRaHHmc"
    },
    {
    "title": "Test 3",
    "description": "Description for Test 3",
    "category": "category 3",
    "link": "https://www.youtube.com/watch?v=MukcBRaHHmc"
    },
    {
    "title": "Test 4",
    "description": "Description for Test 4",
    "category": "category 2",
    "link": "https://www.youtube.com/watch?v=MukcBRaHHmc"
    }
];

export default function VideoLibrary() {
    
    /*const [isLoading, setIsLoading] = useState(true);
    const [videoInfo, setVideoInfo] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        VideoApi.getVideoInformation()
            .then((response) => {
                if (response.status === 200) {
                    setVideoInfo(response.data);
                    setIsLoading(false);
                } else {
                    // TODO: same as error
                }
            }).catch((error) => {
                console.error(`ERROR HAPPENED: ${error}`);
                setIsLoading(false);
                //TODO: User was unable to get video information, 
                //     display error message
            });
    }, []);
    
*/
    /** Add functionalities */
    const [addPopupShown, setAddPopupShown] = useState(false);

    const itemTitle = "";
    const itemDesc = "";
    const itemCat = "";
    const itemLink = "";

    const addPopup = () => (
        <div> 
          <div className="popup-add">
            <h2>Enter Information</h2>
            <form onSubmit={handleAdd} className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                <LabeledInputField type="text" id="title" name="title" required={true} placeholder="Title" defaultValue={itemTitle} />
                <LabeledInputField className="mt-5" type="text" id="description" name="description" required={false} placeholder="Description" defaultValue={itemDesc} />
                <LabeledInputField className="mt-5" type="text" id="category" name="category" required={true} placeholder="Category" defaultValue={itemCat} />
                <LabeledInputField className="mt-5" type="text" id="link" name="link" required={true} placeholder="Link" defaultValue={itemLink} />
                <button type='submit'>Submit</button>
            </form>
            <button onClick={() => setAddPopupShown(false)}>Cancel</button>
          </div>
        </div>
    );

    const handleAdd = (e) => {
        try {
            //await VideoApi.deleteVideo(videoId);
            //deleteItemInfo(response);
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                title: formData.get("title"),
                description: formData.get("description"),
                category: formData.get("category"),
                link: formData.get("link")
            };
            
            /*await VideoApi.createVideo(data).then((response)=>{
                if(response.status === 201){
                    alert('Successfully added!');
                }
            });*/
            console.log(`added ${JSON.stringify(data)}`);
            setAddPopupShown(false);
            let newItems = [data, ...items]
            console.log("Items list: " + JSON.stringify(newItems));
            setItems([...newItems]);  // force re-render of list to reflect the deleted

        } catch (error) {
            //console.error(`ERROR HAPPENED: ${error}`);
        }
      };

    const [items, setItems] = useState(testVideos);
    /** Test input until the backend is connected */


    /** Pop up functionality for clicking on the title of a video */
    const [popupItem, setPopupItem] = useState(null);
    
    const openPopup = (item) => {
        setPopupItem(item);
    };
    
    const closePopup = () => {
        setPopupItem(null);
    };
    
    const Popup = ({ item }) => (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-4 rounded-md"> 
          <div className="popup-content">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div>
		        <ReactPlayer consule url={item.link}></ReactPlayer>
	        </div>
            <button onClick={() => {
                closePopup();
                setAddPopupShown(true)}}>Add</button>
            <button onClick={() => setDeletePopupShown(true)}>Delete</button>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
    );
    
    /** Delete Popup */
    const [deletePopupShown, setDeletePopupShown] = useState(false);

    const deletePopup = (item) => (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-4 rounded-md"> 
          <div className="popup-delete">
            <h2>Confirm Delete</h2>
            <button onClick={() => handleDelete(item)}>Yes</button>
            <button onClick={() => setDeletePopupShown(false)}>No</button>
          </div>
        </div>
    );

    const handleDelete = async (videoId) => {
        try {
            //await VideoApi.deleteVideo(videoId);
            //deleteItemInfo(response);
            console.log(`deleted ${JSON.stringify(videoId)}`);
            setDeletePopupShown(false);
            closePopup();
            let newItems = items.filter(i => i.title !== videoId.title);
            console.log("Items list: " + JSON.stringify(newItems));
            setItems([...newItems]);  // force re-render of list to reflect the deleted

        } catch (error) {
            //console.error(`ERROR HAPPENED: ${error}`);
        }
      };


    
    
    const extendEdit = (item) => {
        inlineEditPopup(item);
    };
    
    const submitEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            link: formData.get("link")
        };
        await VideoApi.updateVideoInformation(data)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Video updated successfully");
                }
            });
    }


    
      const inlineEditPopup = ({ item }) => (
        <div className="popup">
            <div className="popup-content">
            <form onSubmit={submitEdit} className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                <LabeledInputField type="text" id="title" name="title" required={true} placeholder="Title" defaultValue={itemTitle} />
                <LabeledInputField className="mt-5" type="text" id="description" name="description" required={false} placeholder="Description" defaultValue={itemDesc} />
                <LabeledInputField className="mt-5" type="text" id="category" name="category" required={true} placeholder="Category" defaultValue={itemCat} />
                <LabeledInputField className="mt-5" type="text" id="link" name="link" required={true} placeholder="Link" defaultValue={itemLink} />
                <div className="flex justify-center w-full relative top-14">
                    <button onClick={submitEdit}>Submit Changes</button>
                </div>
            </form>
            </div>
        </div>
      );
    

    /** Video Listing Functionalities as well as popup call*/  
    const displayCategories = () => (
        <div>
        {Object.keys(categorizedObjects).map(category => (
            <div key={category}>
            <h2>{category}</h2>
            <ul>
                {categorizedObjects[category].map((item, index) => (
                <li key={index}>
                    <button onClick={() => openPopup(item)}>{item.title}</button>
                </li>
                ))}
            </ul>
            </div>
        ))}
        {popupItem && <Popup item={popupItem} />}
        {deletePopupShown && deletePopup(popupItem)}
        {addPopupShown && addPopup()}
        </div>
    );
    
    /** Categorizing Videos */
    const videoInfo = Object.values(items);
    
    const categorizedObjects = videoInfo.reduce((acc, obj) => {
        const { category, ...rest } = obj;
        acc[category] = [...(acc[category] || []), rest];
        return acc;
    }, {});

    return (
        <PageContainer1>
        <div className="relative bottom-20">
            <div className="flex w-full justify-center">
                    <div className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">    
                    <h1 className="relative mx-0 text-center text-2xl bottom-4">Video Library</h1>
                        <div>
                            {displayCategories()}
                        </div>
                    </div>
            </div>
        </div>
        </PageContainer1>
    );
}