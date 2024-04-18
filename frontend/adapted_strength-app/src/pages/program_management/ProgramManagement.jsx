import { useState, useEffect, useRef } from "react";
import { BlankPageContainer } from "../../components/PageContainer";
import ProgramDashboard from "./ProgramDashboard";
import WeekDashboard from "./WeekDashboard";
import { useNavigate, useLocation, useParams } from "react-router-dom";


// PROGRAM FORMAT for local web state
// id: program_id++,
// name: name,
// description: description,
// selected: false,
// blocks: []


export default function ProgramMamagement() {

  const location = useLocation();
  // get path variables 
  const { programId, weekId, dayId } = useParams();
  let breadcrumbPreload = [];
  if (programId) {
    breadcrumbPreload.push(programId);
  }
  if (weekId) {
    breadcrumbPreload.push(weekId);
  }
  if (dayId) {
    breadcrumbPreload.push(dayId);
  }
  const [breadcrumb, setBreadcrumb] = useState(breadcrumbPreload);

  useEffect(() => {
    let breadcrumbPreload = [];
    if (programId) {
      breadcrumbPreload.push(programId);
    }
    if (weekId) {
      breadcrumbPreload.push(weekId);
    }
    if (dayId) {
      breadcrumbPreload.push(dayId);
    }
    setBreadcrumb(breadcrumbPreload);
    console.log("breadcrumbPreload", breadcrumbPreload);
  }, [location]);



  return (
    <BlankPageContainer id="program-management">
      {breadcrumb.length <= 0 && <ProgramDashboard breadCrumbState={[breadcrumb, setBreadcrumb]} />}
      {breadcrumb.length == 1 && <WeekDashboard breadCrumbState={[breadcrumb, setBreadcrumb]} />}
    </BlankPageContainer>
  );
}
