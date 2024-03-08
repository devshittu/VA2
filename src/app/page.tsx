"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Blobs, SunBurst, Explore, Explore2, Evolution, WorldEvolution, Intro, BarChart } from "../components/charts";
import { sunburst_data } from "@/data/sunburst";

import { MyContextProvider } from "@/contexts/data_context";
import { useRouter } from "next/navigation";

export const classNames = (...classes: (string | boolean | null | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};


const tabs = [
  { name: "Introduction", id: "intro" },
  { name: "Evolution", id: "evolution" },
  { name: "Market Share", id: "sunburst" },
  { name: "World Evolution", id: "world_evolution" },
  { name: "Extra Fun", id: "hemanth" },
  { name: "Makes Over Timer (TBD)", id: "explore" },
  { name: "Mileage vs CO2 (TBD)", id: "explore2" },
  { name: "Yours", id: "yours" },
];

type NavigationProps = {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

export const Navigation: React.FC<NavigationProps> = ({ selectedTab = "intro", setSelectedTab }) => {

  return (
    <div>
      <div>
        <nav
          className="isolate divide-gray-200 grid grid-cols-1 md:grid-cols-2"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <button
              onClick={() => {console.log(`selected tab: ${tab.id}`); return setSelectedTab(tab.id)}}
              key={tab.id}
              className={classNames(
                tab.id == selectedTab
                  ? "text-gray-900 border-gray-400 bg-gray-50"
                  : "text-gray-500 hover:text-gray-700 border-gray-100",
                "m-2 border-2 rounded-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.id ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.id ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

type SelectedGraphProps = {
  selectedTab: string;
};

export const SelectedGraph: React.FC<SelectedGraphProps> = ({ selectedTab = "sunburst" }) => {
  const router = useRouter()
  if (selectedTab == "sunburst") {
    return <SunBurst data={sunburst_data} />;
  }
  if (selectedTab == "yours") {
    return (
      <>
      <Blobs
        data={[
          { r: 5.148585196204891, group: 0 },
          { r: 12.165799682522458, group: 2 },
          { r: 17.28646310018443, group: 3 },
          { r: 13.106289115828547, group: 4 },
          { r: 10.424400994182266, group: 1 },
          { r: 10.93892343253752, group: 2 },
        ]}
      />

      <BarChart
        data={[
          { year: 2021, sales: 60 },
          { year:  2028, sales: 26 },
          { year: 2023, sales: 36 },
          { year:  2027, sales: 46 },
          { year:  2026, sales: 16 },
          { year: 2022, sales: 26 },
        ]}
      />
      
      </>
    );
  }
  if (selectedTab == "intro") {
    return <Intro />;
  }
  if (selectedTab == "explore") {
    return <Explore />;
  }
  if (selectedTab === "explore2") {
    return <Explore2 />;
  }
  if (selectedTab === "evolution") {
    return <Evolution />;
  }
  if (selectedTab === "world_evolution") {
    return <WorldEvolution />;
  }
  if (selectedTab == "hemanth") {
    // redirect to another page with next router
    router.push("/hemanth_charts.html");
  }
  // if (selectedTab == "hemanth") {
  //   // redirect to another page with next router
  //   router.push("/hemanth_charts.html");
  // }
}

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<string>("intro");
  return (
    <MyContextProvider>
      <div className="w-full md:w-4/5 m-auto space-y-2 py-16 sm:py-24 min-h-screen">
        <div className="flex justify-center text-base font-semibold leading-6 text-gray-900">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Dashboard
          </h1>
        </div>

        <Navigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <div className="w-full border-2 p-5 rounded-lg">
          <SelectedGraph selectedTab={selectedTab} />
        </div>
      </div>
    </MyContextProvider>
  );
}
