import { useState } from "react";
import ActivityLog from "../components/ActivityLog";
import VisitorTracker from "../components/VisitorTracker";

function CyberMonitorApp() {
  const [activeTab, setActiveTab] =
    useState("activity");

  return (
    <div className="h-full flex flex-col text-green-400">

      {/* Tabs */}
      <div className="flex border-b border-green-500">

        <button
          onClick={() =>
            setActiveTab("activity")
          }
          className={`
            px-4 py-2
            ${
              activeTab === "activity"
                ? "bg-green-500 text-black"
                : ""
            }
          `}
        >
          Activity Log
        </button>

        <button
          onClick={() =>
            setActiveTab("visitors")
          }
          className={`
            px-4 py-2
            ${
              activeTab === "visitors"
                ? "bg-green-500 text-black"
                : ""
            }
          `}
        >
          Visitor Tracker
        </button>

      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">

        {activeTab === "activity" && (
          <ActivityLog embedded />
        )}

        {activeTab === "visitors" && (
          <VisitorTracker embedded />
        )}

      </div>

    </div>
  );
}

export default CyberMonitorApp;