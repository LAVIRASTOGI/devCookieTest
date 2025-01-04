import { quizTopics } from "@/constants/quizTopic";
import { extractObjectFromArray } from "@/utils/commonFunction";
import QuizSidebar from "./QuizSideBar";

function TopicsDashboard({ topic }) {
  const quizDetails = extractObjectFromArray(quizTopics, "id", topic);
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Sidebar content here */}

        {quizDetails?.id && (
          <QuizSidebar quizTopicsDetails={quizDetails?.quizTopicsDetails} />
        )}
      </div>
    </div>
  );
}

export default TopicsDashboard;
