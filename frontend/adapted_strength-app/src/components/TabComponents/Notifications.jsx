import React from "react";
import Content from "../Content";
const Notifications = () => {
  return (
    <div className="Notifications">
      <Content notficList={[]} type={"notification"} />
    </div>
  );
};
export default Notifications;