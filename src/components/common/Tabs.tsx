"use client";

import React, { ReactNode, useState } from "react";

interface TabPanelProps {
  tabId: string;
  label: string;
  children: ReactNode;
}

interface TabsProps {
  defaultActiveTab?: string;
  children: React.ReactElement<TabPanelProps>[];
}

export function Tabs({
  defaultActiveTab: defaultActiveTabId,
  children,
}: TabsProps) {
  const tabIds = children.map((child) => child.props.tabId);

  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTabId || tabIds[0],
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="flex gap-2">
        {children.map((child) => {
          const { tabId, label } = child.props;
          const isActive = tabId === activeTab;
          return (
            <button
              key={tabId}
              onClick={() => handleTabClick(tabId)}
              className={`border-b-2 px-3 py-1 ${
                isActive ? "border-blue-500" : "border-transparent"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {children.map((child) => {
          if (child.props.tabId === activeTab) {
            return <div key={child.props.tabId}>{child.props.children}</div>;
          }
        })}
      </div>
    </div>
  );
}
export function TabPanel({ children }: TabPanelProps) {
  return <>{children}</>;
}
