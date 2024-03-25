import React, { useState } from "react";
import Announcements from "./Announcements";
import Notifications from "./Notifications";
import TabNavItem from "../TabNavItem";
import TabContent from "../TabContent";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    return (
        <div className="Tabs">
            <ul className="nav">
                <TabNavItem title="Announcements" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title="Notifications" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
            </ul>

            <div className="outlet">
                <TabContent id="tab1" activeTab={activeTab}>
                    <Announcements/>
                </TabContent>
                <TabContent id="tab2" activeTab={activeTab}>
                    <Notifications/>
                </TabContent>
            </div>
        </div>
    );
};
export default Tabs;